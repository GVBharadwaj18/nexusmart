export const geminiApiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
export const geminiModel = process.env.GEMINI_MODEL || process.env.OPENAI_MODEL || "gemini-3.6-flash";
export const geminiBaseUrl = "https://generativelanguage.googleapis.com/v1beta";
