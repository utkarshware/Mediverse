import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

const API_KEY = "AIzaSyD5etr1dXCXfps2nKgaOd4kLAu0PfRgjAs";
if (!API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

function extractJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { imageBase64, language = "English" } = req.body;
    if (!imageBase64) return res.status(400).json({ error: "Missing image" });

    const geminiRes = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64
              }
            },
            {
              text: `
You are an AI medical device trainer.
Respond ONLY in ${language}.
Return ONLY valid JSON. No markdown.

{
  "device": "",
  "about": "",
  "usage": "",
  "measures": [
    { "label": "", "description": "" }
  ],
  "steps": [
    {
      "title": "",
      "target": "start|screen|cuff|tube|body",
      "explanation": "",
      "mistakes": ""
    }
  ]
}`
            }
          ]
        }]
      })
    });

    const data = await geminiRes.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("");

    if (!rawText) {
      return res.status(500).json({ error: "Gemini returned no text", raw: data });
    }

    const cleaned = extractJSON(rawText);
    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (err) {
    console.error("❌ Gemini error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { question, deviceContext } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    const geminiRes = await fetch(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are an AI medical device assistant.

Device context:
${JSON.stringify(deviceContext, null, 2)}

User question:
"${question}"

Rules:
- Answer clearly and simply
- Be medically cautious
- Do NOT diagnose
- If unsure, suggest consulting a healthcare professional
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(p => p.text)
        .join("") || "Sorry, I couldn't answer that.";

    res.json({ answer });

  } catch (err) {
    console.error("❌ Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () =>
  console.log("✅ Gemini AI server running at http://localhost:5001")
);