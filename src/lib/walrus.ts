import type { BlobInfo, WalrusMetrics } from "@/types"
import { tatumRpcCall } from "./tatum"

const WALRUS_PUBLISHER_OBJECT = process.env.WALRUS_PUBLISHER_ID || ""

export async function queryWalrusBlobs(
  cursor?: string,
  limit = 50
): Promise<{ blobs: BlobInfo[]; nextCursor?: string }> {
  const result = await tatumRpcCall<{
    data: {
      id: string
      publisher: string
      size: string
      storage_type: string
      timestamp: string
      content_digest: string
      erasure_code_type: string
    }[]
    nextCursor?: string
    hasNextPage: boolean
  }>("suix_getDynamicFieldObject", [
    WALRUS_PUBLISHER_OBJECT,
    cursor,
    limit,
  ])

  const blobs: BlobInfo[] = (result?.data || []).map((item) => ({
    id: item.id,
    publisher: item.publisher,
    size: parseInt(item.size || "0"),
    storageType: item.storage_type || "permanent",
    timestamp: parseInt(item.timestamp || "0"),
    digest: item.content_digest || "",
    erasureCodeType: item.erasure_code_type || "redStuff",
  }))

  return {
    blobs,
    nextCursor: result?.nextCursor,
  }
}

export async function getAggregatedMetrics(): Promise<WalrusMetrics> {
  let allBlobs: BlobInfo[] = []
  let cursor: string | undefined
  let fetchCount = 0

  while (fetchCount < 10) {
    const { blobs, nextCursor } = await queryWalrusBlobs(cursor, 50)
    allBlobs = [...allBlobs, ...blobs]
    if (!nextCursor) break
    cursor = nextCursor
    fetchCount++
  }

  return computeMetrics(allBlobs)
}

function computeMetrics(blobs: BlobInfo[]): WalrusMetrics {
  const totalBlobs = blobs.length
  const totalSize = blobs.reduce((acc, b) => acc + b.size, 0)
  const avgBlobSize = totalBlobs > 0 ? Math.round(totalSize / totalBlobs) : 0

  const publisherMap = new Map<string, { count: number; totalSize: number }>()
  const dateMap = new Map<string, number>()
  const sizeBuckets = new Map<string, number>()

  const sizes = [
    { max: 1024, label: "< 1 KB" },
    { max: 10240, label: "1-10 KB" },
    { max: 102400, label: "10-100 KB" },
    { max: 1048576, label: "100 KB-1 MB" },
    { max: Infinity, label: "> 1 MB" },
  ]

  for (const blob of blobs) {
    const existing = publisherMap.get(blob.publisher) || { count: 0, totalSize: 0 }
    publisherMap.set(blob.publisher, {
      count: existing.count + 1,
      totalSize: existing.totalSize + blob.size,
    })

    const dateKey = blob.timestamp
      ? new Date(blob.timestamp * 1000).toISOString().slice(0, 10)
      : "unknown"
    dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1)

    const bucket = sizes.find((s) => blob.size < s.max)?.label || "> 1 MB"
    sizeBuckets.set(bucket, (sizeBuckets.get(bucket) || 0) + 1)
  }

  const topPublishers = [...publisherMap.entries()]
    .map(([address, data]) => ({ address, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const blobsOverTime = [...dateMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }))

  const sizeDistribution = sizes
    .map((s) => ({ range: s.label, count: sizeBuckets.get(s.label) || 0 }))
    .filter((s) => s.count > 0)

  const uniquePublishers = publisherMap.size

  return {
    totalBlobs,
    totalSize,
    uniquePublishers,
    avgBlobSize,
    topPublishers,
    blobsOverTime,
    sizeDistribution,
  }
}

export type { BlobInfo, WalrusMetrics }
