"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalrusMetrics } from "@/lib/walrus"

interface StorageDistributionProps {
  data: WalrusMetrics["sizeDistribution"]
}

export function StorageDistribution({ data }: StorageDistributionProps) {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  const total = data.reduce((acc, d) => acc + d.count, 0) || 1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Size Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={item.range} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">{item.range}</span>
                <span className="font-medium">{item.count}</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(item.count / total) * 100}%`,
                    backgroundColor: colors[i % colors.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
