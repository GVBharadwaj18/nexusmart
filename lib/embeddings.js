import { geminiApiKey, geminiBaseUrl } from "../configs/openai.js";

/**
 * Generate a 768-dimensional vector embedding for text using Google Gemini
 * @param {string} text - The input query or product content
 * @returns {Promise<number[] | null>} 768-dimensional float array
 */
export async function getEmbedding(text) {
    if (!text || !geminiApiKey) return null;

    try {
        const response = await fetch(
            `${geminiBaseUrl}/models/gemini-embedding-001:embedContent?key=${encodeURIComponent(geminiApiKey)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "models/gemini-embedding-001",
                    content: {
                        parts: [{ text: String(text).slice(0, 2048) }]
                    },
                    outputDimensionality: 768
                })
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini embedding API error:", errText);
            return null;
        }

        const data = await response.json();
        return data?.embedding?.values || null;
    } catch (error) {
        console.error("Failed to generate embedding:", error);
        return null;
    }
}
