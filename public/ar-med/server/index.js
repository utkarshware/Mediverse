import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // allow requests from anywhere (OK for demo/hackathon)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json({ limit: "20mb" }));

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
} else {
  console.log("✅ GEMINI_API_KEY loaded successfully");
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

    console.log(
      "📸 Received image, sending to Gemini... size:",
      `${Math.round(imageBase64.length / 1024)} KB`,
    );

    const geminiRes = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageBase64,
                },
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
}`,
              },
            ],
          },
        ],
      }),
    });

    console.log(
      "📡 Gemini response status:",
      geminiRes.status,
      geminiRes.statusText,
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      const errorHeaders = Object.fromEntries(geminiRes.headers.entries());
      console.error("❌ Gemini API error:", {
        status: geminiRes.status,
        statusText: geminiRes.statusText,
        headers: errorHeaders,
        body: errorText,
      });
      return res.status(500).json({
        error: `Gemini API error: ${geminiRes.status}`,
        statusText: geminiRes.statusText,
        headers: errorHeaders,
        body: errorText,
      });
    }

    const data = await geminiRes.json();
    console.log("✅ Gemini response received");
    console.log("📊 Full Gemini response:", JSON.stringify(data, null, 2));

    // Check for API errors in the response
    if (data?.error) {
      console.error("❌ Gemini API returned error:", data.error);
      return res.status(500).json({
        error: `Gemini API error: ${data.error.message || data.error}`,
        details: data,
      });
    }

    const rawText = data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .join("");
    console.log(
      "📝 Raw text extracted:",
      rawText ? rawText.substring(0, 100) : "NONE",
    );

    if (!rawText) {
      console.error(
        "❌ Gemini returned no text. Full response:",
        JSON.stringify(data, null, 2),
      );
      return res
        .status(500)
        .json({ error: "Gemini returned no text", raw: data });
    }

    const cleaned = extractJSON(rawText);
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ Failed to parse Gemini JSON:", {
        message: parseErr.message,
        cleanedSnippet: cleaned.substring(0, 200),
      });
      return res.status(500).json({
        error: "Failed to parse Gemini JSON",
        details: parseErr.message,
        cleaned,
      });
    }

    console.log("✅ Analysis complete:", parsed.device);
    res.json(parsed);
  } catch (err) {
    console.error("❌ Gemini error:", err.message, err.stack);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { question, deviceContext } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    const geminiRes = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
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
`,
              },
            ],
          },
        ],
      }),
    });

    const data = await geminiRes.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Sorry, I couldn't answer that.";

    res.json({ answer });
  } catch (err) {
    console.error("❌ Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () =>
  console.log("✅ Gemini AI server running at http://localhost:5001"),
);
