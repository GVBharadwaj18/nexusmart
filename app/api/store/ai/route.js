import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { geminiApiKey, geminiBaseUrl, geminiModel } from "@/configs/openai";

async function main(base64Image,mimeType){
    const response = await fetch(`${geminiBaseUrl}/models/${geminiModel}:generateContent?key=${encodeURIComponent(geminiApiKey)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `You are a product listing assistant for an e-commerce store. Analyze this product image and return ONLY valid JSON in this exact schema: { "name": "string", "description": "string" }. Keep the name short and the description marketing friendly, highlighting key features and benefits.`
                        },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: base64Image
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
            }
        })
    });

    const raw = await response.text();
    let data;
    try {
        data = JSON.parse(raw);
    } catch (error) {
        throw new Error(`Gemini API returned invalid JSON: ${raw.slice(0, 500)}`);
    }

    if (!response.ok) {
        throw new Error(data?.error?.message || `Gemini API request failed with status ${response.status}`);
    }

    const output = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || "")
        .join("") || "";

    const cleaned = String(output)
        .replace(/```(?:json)?/gi, "")
        .replace(/```/g, "")
        .trim();

    let parsed;
    try {
        parsed = JSON.parse(cleaned);
    } catch (error) {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (!match) {
            throw new Error("Failed to parse Gemini response as JSON");
        }
        parsed = JSON.parse(match[0]);
    }
    return parsed;
}

export async function POST(request) {
    try{
        const {userId}=getAuth(request);
        const isSeller=await authSeller(userId);
        if(!isSeller){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const {base64Image,mimeType}=await request.json();

        const result=await main(base64Image,mimeType);
        return NextResponse.json({data:result});
    }catch(error){
        console.error(error);
        return  NextResponse.json({error:error.code || error.message},{status:400})
    }
}