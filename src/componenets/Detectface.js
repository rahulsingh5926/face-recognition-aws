import React, { useState } from "react";

const Detectface = () => {
  const [result, setResult] = useState(null);

  const runRekognition = async () => {
    try {
      const url = "http://localhost:3001/detect-face";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data);
      setResult(data.data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    }
  };

  return (
    <div>
      <button onClick={runRekognition}>Run Rekognition</button>
      {result && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Detectface;
