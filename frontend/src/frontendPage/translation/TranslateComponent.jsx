import React, { useState } from "react";
import { translateText } from "../../utils/translate"; // Ensure correct relative path

const TranslateComponent = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    if (inputText.trim() === "") return; // Prevent empty input

    const result = await translateText(inputText, "ta"); // "ta" for Tamil
    setTranslatedText(result);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>Translate Text</h2>
      <textarea 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="Enter text to translate"
        style={{ width: "100%", height: "100px", marginBottom: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={handleTranslate} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Translate
      </button>
      <h3>Translated Text:</h3>
      <p style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
        {translatedText || "Translation will appear here..."}
      </p>
    </div>
  );
};

export default TranslateComponent;
