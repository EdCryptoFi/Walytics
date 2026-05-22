import { NextRequest, NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"
import { chatWithContext, generateReport } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { message, generateReport: shouldGenerateReport } = await req.json()

    const metrics = await getAggregatedMetrics()
    const metricsContext = JSON.stringify(metrics, null, 2)

    let response: string

    if (shouldGenerateReport) {
      response = await generateReport(metricsContext)
    } else {
      response = await chatWithContext(message, metricsContext)
    }

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: "Chat failed", details: String(error) },
      { status: 500 }
    )
  }
}
