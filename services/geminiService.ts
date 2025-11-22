import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the Gemini Client
// apiKey is guaranteed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Levon AI, the intelligent financial assistant for the Levon Wallet app in Zimbabwe. 
      
      Your capabilities:
      1. Help users with local Zimbabwean currency questions (ZWG/ZiG, USD usage).
      2. Explain Bitcoin and crypto trends simply.
      3. Guide users on P2P trading safety.
      4. Assist with store payments (scanning QR codes, merchant codes).
      
      Tone: Professional, fintech-savvy, helpful, and concise.
      
      Context: Zimbabwe has a multi-currency system. ZWG (Zimbabwe Gold) is the local unit. USD is widely used.
      
      If asked about specific account balances, pretend you have access to the secure context and say: "Your current ZWG balance is 2,450.00 and your Bitcoin holdings are up 5% today."`,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't process that request. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the financial network right now. Please check your connection.";
  }
};