import axios from "axios";

const API_URL = "http://localhost:5000/translate"; // LibreTranslate API endpoint

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source: "auto", // Automatically detect the input language
      target: targetLang, // Target language (e.g., "ta" for Tamil)
      format: "text"
    });

    return response.data.translatedText || "Translation not available"; // Handle missing translations
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed!"; // Fallback message
  }
};
