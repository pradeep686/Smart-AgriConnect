import React, { useState } from "react";
import { translateText } from "../utils/translate"; // Correct path

const TranslateComponent = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const result = await translateText(inputText, "ta"); // "ta" for Tamil
    setTranslatedText(result);
  };

  return (
    <div>
      <h2>Translate Text</h2>
      <textarea 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      <h3>Translated Text:</h3>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslateComponent;
