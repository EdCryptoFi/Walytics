import { NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"

export async function GET() {
  try {
    const metrics = await getAggregatedMetrics()
    return NextResponse.json(metrics)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics", details: String(error) },
      { status: 500 }
    )
  }
}
