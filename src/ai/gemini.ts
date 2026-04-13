import { GoogleGenerativeAI } from "@google/generative-ai";

export const GEMINI_FLASH = "gemini-3-flash-preview";
export const GEMINI_PRO = "gemini-3.1-pro-preview";

export function getGeminiModel(modelId: string = GEMINI_FLASH) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelId });
}
