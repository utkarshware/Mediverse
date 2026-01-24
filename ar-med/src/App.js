import ScanDevice from "./ScanDevice";

export default function App() {
  const onDetected = () => {
    window.location.href = "/viewer.html";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Medical Device Image</h2>
      <ScanDevice onDetected={onDetected} />
    </div>
  );
}