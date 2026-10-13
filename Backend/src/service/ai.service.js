
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.google_genAI_api_key,
});

async function invokeGeminiAI() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: "hey Gemini AI, can you provide a brief overview of the latest advancements in AI technology?",
    });

    console.log(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error.message);
  }
}

export default invokeGeminiAI;
