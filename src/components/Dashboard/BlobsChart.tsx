"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalrusMetrics } from "@/lib/walrus"

interface BlobsChartProps {
  data: WalrusMetrics["blobsOverTime"]
}

export function BlobsChart({ data }: BlobsChartProps) {
  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Blobs Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-zinc-400">
            No data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * 100
    const y = 100 - (d.count / maxCount) * 100
    return `${x},${y}`
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Blobs Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              points={points.join(" ")}
            />
            <polygon
              fill="url(#gradient)"
              points={`0,100 ${points.join(" ")} 100,100`}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-2 flex justify-between text-xs text-zinc-400">
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
