const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export async function identifyDevice(imageBase64) {
  try {
    const res = await fetch(`${API_URL}/api/gemini/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!res.ok) {
      let errorPayload;
      try {
        errorPayload = await res.json();
      } catch (jsonErr) {
        errorPayload = await res.text();
      }

      console.error("❌ API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorPayload,
      });

      throw new Error(
        `Gemini request failed: ${
          (errorPayload && errorPayload.error) || res.statusText
        } (status ${res.status})`,
      );
    }

    return res.json();
  } catch (err) {
    console.error("❌ Detailed error:", err);
    throw err;
  }
}
