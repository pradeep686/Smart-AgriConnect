import axios from "axios";

const API_URL = "http://localhost:5000/translate";

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source: "auto", // Automatically detect source language
      target: targetLang, // Target language (e.g., "ta" for Tamil, "hi" for Hindi)
      format: "text"
    });

    return response.data.translatedText; // Get translated text
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
};
