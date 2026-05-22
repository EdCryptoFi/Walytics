import { NextRequest, NextResponse } from "next/server"

const TATUM_API_KEY = process.env.TATUM_API_KEY || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { method, params } = body

    const res = await fetch("https://sui-mainnet.gateway.tatum.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": TATUM_API_KEY,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: params || [],
      }),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "RPC call failed", details: String(error) },
      { status: 500 }
    )
  }
}
