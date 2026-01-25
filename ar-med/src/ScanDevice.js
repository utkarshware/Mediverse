import { identifyDevice } from "../src/api";

export default function ScanDevice({ onDetected }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];
        const aiData = await identifyDevice(base64);

        console.log("🧠 AI DATA:", aiData);

        localStorage.setItem("aiDeviceData", JSON.stringify(aiData));
        onDetected();
      } catch (err) {
        console.error(err);
        alert("AI failed. Check console.");
      }
    };

    reader.readAsDataURL(file);
  };

  return <input type="file" accept="image/*" onChange={handleUpload} />;
}