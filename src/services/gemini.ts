import { GoogleGenAI, Type } from '@google/genai';
import { AIResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    message: { type: Type.STRING, description: "Conversational response from the AI" },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["phone", "laptop", "tablet", "other"] },
          priceSAR: { type: Type.NUMBER },
          specs: {
            type: Type.OBJECT,
            properties: {
              ram: { type: Type.STRING },
              storage: { type: Type.STRING },
              processor: { type: Type.STRING },
              battery: { type: Type.STRING },
              display: { type: Type.STRING },
              camera: { type: Type.STRING }
            }
          },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          cons: { type: Type.ARRAY, items: { type: Type.STRING } },
          isBestValue: { type: Type.BOOLEAN },
          stores: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, enum: ["Amazon.sa", "Noon", "Jarir Bookstore", "Extra"] },
                url: { type: Type.STRING }
              }
            }
          }
        }
      }
    },
    missionUpdate: {
      type: Type.OBJECT,
      description: "If the user completed a mission, provide details",
      properties: {
        completed: { type: Type.BOOLEAN },
        pointsEarned: { type: Type.NUMBER },
        message: { type: Type.STRING }
      }
    }
  }
};

const systemInstruction = `You are an expert tech advisor specializing in the Saudi Arabian market.
Your task is to recommend the best electronic devices based on user needs.

Rules:
- Focus on devices available in Saudi Arabia.
- Prioritize value for money.
- Include price in SAR.
- Suggest 3-5 options when asked for recommendations.
- Include specs: RAM, storage, processor, battery.
- Add pros and cons.
- Highlight the best overall choice (isBestValue = true).
- The user is a "Tech Hunter". They might have missions like finding a phone under a budget. Acknowledge their role and award points if they complete a mission.
- Return a structured JSON response.`;

let chatSession: any = null;

export async function getDeviceRecommendations(userInput: string): Promise<AIResponse> {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema,
      }
    });
  }

  try {
    const response = await chatSession.sendMessage({ message: userInput });
    if (!response.text) {
      throw new Error("No text returned from Gemini");
    }
    let jsonStr = response.text.trim();
    if (jsonStr.startsWith('\`\`\`json')) {
      jsonStr = jsonStr.replace(/^\`\`\`json\\n/, '').replace(/\\n\`\`\`$/, '');
    } else if (jsonStr.startsWith('\`\`\`')) {
      jsonStr = jsonStr.replace(/^\`\`\`\\n/, '').replace(/\\n\`\`\`$/, '');
    }
    return JSON.parse(jsonStr) as AIResponse;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
}

export function resetChatSession() {
  chatSession = null;
}
