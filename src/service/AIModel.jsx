import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;


let genAI;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
} else {
    console.error("Gemini API key is not defined.");
}

const model = genAI?.getGenerativeModel({
    model: 'gemini-flash-latest',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const generateTravelPlan = async (prompt) => {
    if (!model) {
        return { error: "Gemini model is not initialized. Check API key." };
    }

    let resultText = '';

    try {
        const chat = model.startChat({ generationConfig });

        const result = await chat.sendMessage(prompt);
        resultText = result.response.text();

        let cleanJsonText = resultText;
        if (cleanJsonText.startsWith("```json")) {
            cleanJsonText = cleanJsonText.substring(7, cleanJsonText.length - 3).trim();
        }

        const parsedResponse = JSON.parse(cleanJsonText);

        return parsedResponse;

    } catch (error) {
        console.error("Error generating travel plan:", error);
        toast("--- Raw response from AI that caused error, Please Generate again ---");
         return { error: "Failed to generate travel plan. Please check the console for details." };
    }
};