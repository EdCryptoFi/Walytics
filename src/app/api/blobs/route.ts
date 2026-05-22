import { NextResponse } from "next/server"
import { queryWalrusBlobs } from "@/lib/walrus"

export async function GET() {
  try {
    const { blobs } = await queryWalrusBlobs(undefined, 100)
    return NextResponse.json(blobs)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blobs", details: String(error) },
      { status: 500 }
    )
  }
}
