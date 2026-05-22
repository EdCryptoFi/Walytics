import type { BlobInfo, WalrusMetrics } from "@/types"

const MOCK_PUBLISHERS = [
  { address: "0xd4e83c7f5b2a1960e8f4d9c3b7a6e5f0c8d2a931", label: "Sui Capy Storage" },
  { address: "0x91bf4a8d6e3c7f2b0a5d9e8c1f4b7a3d6e0fc042", label: "WalrusVault Pro" },
  { address: "0x2f8a4b6c0d1e3f5a7b9c2d4e6f8a0b1c3d5e7f80", label: "BlobHoard DAO" },
  { address: "0xc3d5e7f9a1b2c4d6e8f0a2b4c6d8e0f1a3b5c7d9", label: "Mysten Archiver" },
  { address: "0x5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b", label: "DeFi Snapshots" },
  { address: "0xe8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6", label: "NFT Vault Sui" },
  { address: "0x1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b", label: "GameFi Assets" },
  { address: "0x4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c", label: "Data Capsule Co" },
]

const MIME_TYPES = [
  "image/png", "image/jpeg", "video/mp4", "text/plain",
  "application/pdf", "application/json", "model/gltf-binary", "audio/mp3",
]

function generateMockBlobs(count: number): BlobInfo[] {
  const blobs: BlobInfo[] = []
  const now = Math.floor(Date.now() / 1000)
  const thirtyDaysAgo = now - 30 * 86400

  for (let i = 0; i < count; i++) {
    const publisher = MOCK_PUBLISHERS[i % MOCK_PUBLISHERS.length].address
    const timestamp = thirtyDaysAgo + Math.floor(Math.random() * (now - thirtyDaysAgo))
    const size = Math.floor(Math.random() * 500000) + 500

    blobs.push({
      id: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      publisher,
      size,
      storageType: MIME_TYPES[Math.floor(Math.random() * MIME_TYPES.length)],
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

  const publisherLabels = new Map(MOCK_PUBLISHERS.map(p => [p.address, p.label]))

  const topPublishers = [...publisherMap.entries()]
    .map(([address, data]) => ({ address, label: publisherLabels.get(address) ?? "Unknown", ...data }))
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
