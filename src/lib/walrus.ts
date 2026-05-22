import type { BlobInfo, WalrusMetrics } from "@/types"

const WALRUS_PACKAGE_ID = process.env.WALRUS_PACKAGE_ID || ""
const USE_LIVE_DATA = !!WALRUS_PACKAGE_ID

const MOCK_PUBLISHERS = [
  "0x7b8f3a2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
  "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
  "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0",
  "0xf0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4",
  "0x1234567890abcdef1234567890abcdef12345678",
  "0xdeadbeefcafebabedeadbeefcafebabedeadbeef",
  "0xabcdef0123456789abcdef0123456789abcdef01",
  "0x0102030405060708090a0b0c0d0e0f1011121314",
]

function generateMockBlobs(count: number): BlobInfo[] {
  const blobs: BlobInfo[] = []
  const now = Math.floor(Date.now() / 1000)
  const thirtyDaysAgo = now - 30 * 86400

  for (let i = 0; i < count; i++) {
    const publisher = MOCK_PUBLISHERS[i % MOCK_PUBLISHERS.length]
    const timestamp = thirtyDaysAgo + Math.floor(Math.random() * (now - thirtyDaysAgo))
    const size = Math.floor(Math.random() * 500000) + 500

    blobs.push({
      id: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      publisher,
      size,
      storageType: Math.random() > 0.3 ? "permanent" : "ephemeral",
      timestamp,
      digest: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      erasureCodeType: "redStuff",
    })
  }

  return blobs.sort((a, b) => b.timestamp - a.timestamp)
}

const mockBlobs = generateMockBlobs(500)

export async function queryWalrusBlobs(
  _cursor?: string,
  limit = 50
): Promise<{ blobs: BlobInfo[]; nextCursor?: string }> {
  const start = _cursor ? parseInt(_cursor) : 0
  const end = start + limit
  const page = mockBlobs.slice(start, end)

  return {
    blobs: page,
    nextCursor: end < mockBlobs.length ? String(end) : undefined,
  }
}

function countBlobsInLastDays(blobs: BlobInfo[], days: number): number {
  const cutoff = Math.floor(Date.now() / 1000) - days * 86400
  return blobs.filter((b) => b.timestamp >= cutoff).length
}

export async function getAggregatedMetrics(): Promise<WalrusMetrics> {
  const blobs = mockBlobs
  return computeMetrics(blobs)
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

export { computeMetrics }
export type { BlobInfo, WalrusMetrics }
