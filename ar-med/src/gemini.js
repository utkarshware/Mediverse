const API_KEY = "AIzaSyD6IrFjVvvPV3Rb5n2V5JGtuy4qsVDFUV4";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

export async function identifyDevice(base64Image) {
  const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Identify the medical device in the image. " +
                "Respond ONLY with one of these exact words: " +
                "BP Monitor, Heart Rate Monitor, Unknown."
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image.split(",")[1]
              }
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  console.log("Gemini raw response:", data);

  if (!data.candidates) return "Unknown";
  return data.candidates[0].content.parts[0].text.trim();
}

export async function generateUsageSteps(device) {
const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    `Give 3 short, clear steps for using a ${device}. ` +
                    `Each step should be one sentence, beginner-friendly.`
                }
              ]
            }
          ]
        })
      }
    );
  
    const data = await response.json();
    return data.candidates[0].content.parts[0].text
      .split("\n")
      .filter(Boolean);
  }