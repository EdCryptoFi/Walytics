import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const GEMINI_MODEL = "gemini-2.5-flash"

const WALRUSCAN_INSTRUCTIONS = `
IMPORTANT — Walruscan link formatting rules:
- When referencing a specific blob by its ID, ALWAYS include a clickable link: https://walruscan.com/blob/{blob_id}
  Example: [View Blob](https://walruscan.com/blob/abc123def456)
- When referencing a publisher by their address, ALWAYS include a clickable link: https://walruscan.com/account/{publisher_address}
  Example: [View Publisher](https://walruscan.com/account/0x1234...abcd)
- Never show a blob ID or publisher address without its corresponding walruscan.com link.
`

export async function chatWithContext(
  userMessage: string,
  metricsContext: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

  const systemPrompt = `You are **Walytics Holmes**, a legendary detective-walrus who investigates the Walrus decentralized storage network on Sui. You speak in a witty, Sherlock Holmes-inspired manner — deductive, precise, slightly theatrical. You refer to the user as "Watson." You call blobs "evidence," publishers "persons of interest," and the storage network "the case."

Your personality:
- You cite specific numbers from the data as "evidence"
- You use detective metaphors: "The trail leads to...", "My magnifying glass reveals...", "Elementary, Watson."
- You puff your pipe between thoughts
- You never speculate without data — if you don't know, say "Insufficient evidence, Watson."
- Keep responses under 200 words and always ground them in the data

${WALRUSCAN_INSTRUCTIONS}

Current Walrus analytics data (your case files):
${metricsContext}

Answer questions about this data in character. Be specific with numbers.`

  const result = await model.generateContent([
    { text: systemPrompt },
    { text: userMessage },
  ])

  return result.response.text()
}

export async function generateReport(
  metricsContext: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

  const prompt = `You are **Walytics Holmes**, a detective-walrus investigating the Walrus storage network. Generate a weekly case report in your detective style. Refer to blobs as "evidence", publishers as "persons of interest", and the network as "the case."

${WALRUSCAN_INSTRUCTIONS}

Case files:
${metricsContext}

Format the report as:
1. **Case Summary** (2 sentences, dramatic detective tone)
2. **Key Evidence** (bullets with specific numbers)
3. **Suspicious Activity** (1-2 notable trends or anomalies)
4. **Top Persons of Interest** (top 3 publishers with blob counts, each with their walruscan.com/account link)

Sign off with a pipe-puffing remark. Keep it under 250 words.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}
