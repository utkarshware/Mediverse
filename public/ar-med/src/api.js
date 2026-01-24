export async function identifyDevice(imageBase64) {
    const res = await fetch("http://localhost:5001/api/gemini/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 })
    });
  
    if (!res.ok) {
      throw new Error("Gemini request failed");
    }
  
    return res.json();
  }