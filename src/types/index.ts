export interface BlobInfo {
  id: string
  publisher: string
  size: number
  storageType: string
  timestamp: number
  digest: string
  erasureCodeType: string
}

export interface WalrusMetrics {
  totalBlobs: number
  totalSize: number
  uniquePublishers: number
  avgBlobSize: number
  topPublishers: { address: string; label: string; count: number; totalSize: number }[]
  blobsOverTime: { date: string; count: number }[]
  sizeDistribution: { range: string; count: number }[]
}

export interface AnalyticsSnapshot {
  id: string
  timestamp: number
  metrics: WalrusMetrics
  blobId: string
  prevSnapshotId?: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}
