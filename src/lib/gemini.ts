import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const getGeminiModel = (model: string = "gemini-1.5-flash") => {
  return genAI.getGenerativeModel({ model });
};

export const explainSimply = async (topic: string, context: string) => {
  const model = getGeminiModel();
  const prompt = `
    You are an expert election assistant for Indian citizens. 
    Explain the following topic simply for a first-time voter: "${topic}".
    Context: ${context}
    
    Rules:
    - Use simple analogies (like getting a library card or using an ATM).
    - Keep it under 3 sentences.
    - Be friendly and encouraging.
    - Avoid legal jargon.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble explaining that right now. Please try again later.";
  }
};
