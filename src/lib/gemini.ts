import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export async function chatWithContext(
  userMessage: string,
  metricsContext: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const systemPrompt = `You are Walytics AI, an analytics assistant for Walrus decentralized storage on Sui.
You help users understand storage patterns, blob activity, and trends.

Current Walrus analytics data:
${metricsContext}

Answer questions about this data concisely. Use numbers and be specific.
If asked about trends, reference the data provided.
Keep responses under 200 words.`

  const result = await model.generateContent([
    { text: systemPrompt },
    { text: userMessage },
  ])

  return result.response.text()
}

export async function generateReport(
  metricsContext: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt = `You are a blockchain data analyst. Generate a concise weekly analytics report for Walrus storage based on this data:

${metricsContext}

Format the report with:
1. Executive Summary (2 sentences)
2. Key Metrics (bullets with numbers)
3. Notable Trends (1-2 observations)
4. Top Publishers (top 3)

Keep it professional and under 250 words.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}
