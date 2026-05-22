"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes } from "@/lib/utils"
import { Database, HardDrive, Users, BarChart3 } from "lucide-react"
import type { WalrusMetrics } from "@/lib/walrus"

interface OverviewCardsProps {
  metrics: WalrusMetrics | null
  loading?: boolean
}

export function OverviewCards({ metrics, loading }: OverviewCardsProps) {
  const cards = [
    {
      title: "Total Blobs",
      value: metrics?.totalBlobs.toLocaleString() ?? "-",
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Storage Used",
      value: metrics ? formatBytes(metrics.totalSize) : "-",
      icon: HardDrive,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Publishers",
      value: metrics?.uniquePublishers.toLocaleString() ?? "-",
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-950/50",
    },
    {
      title: "Avg Blob Size",
      value: metrics ? formatBytes(metrics.avgBlobSize) : "-",
      icon: BarChart3,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">{card.title}</CardTitle>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${loading ? "animate-pulse text-zinc-300" : ""}`}>
              {loading ? "---" : card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
