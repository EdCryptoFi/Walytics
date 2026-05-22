"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, shortenAddress } from "@/lib/utils"
import type { WalrusMetrics } from "@/lib/walrus"

interface TopPublishersProps {
  publishers: WalrusMetrics["topPublishers"]
}

export function TopPublishers({ publishers }: TopPublishersProps) {
  const maxCount = Math.max(...publishers.map((p) => p.count), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Publishers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {publishers.slice(0, 5).map((pub, i) => (
            <div key={pub.address} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">#{i + 1}</span>
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    {shortenAddress(pub.address)}
                  </span>
                </div>
                <span className="font-medium">{pub.count} blobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(pub.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-400">{formatBytes(pub.totalSize)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
