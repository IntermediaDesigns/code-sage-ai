import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following ${language} code and provide suggestions for improvement, potential bugs, and best practices:

${code}

Please format your response in the following way:
1. Code Quality: [Brief overview of code quality]
2. Potential Bugs: [List any potential bugs]
3. Suggestions for Improvement: [List suggestions]
4. Best Practices: [List any best practices that could be applied]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error('Error analyzing code:', error);
    return NextResponse.json({ error: 'Failed to analyze code' }, { status: 500 });
  }
}