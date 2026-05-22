"use client"

import { OverviewCards } from "@/components/Dashboard/OverviewCards"
import { BlobsChart } from "@/components/Dashboard/BlobsChart"
import { TopPublishers } from "@/components/Dashboard/TopPublishers"
import { StorageDistribution } from "@/components/Dashboard/StorageDistribution"
import { TatumStatus } from "@/components/Dashboard/TatumStatus"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function DashboardPage() {
  const { metrics, loading, error } = useAnalytics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Real-time analytics for Walrus decentralized storage
        </p>
      </div>

      <TatumStatus />

      <OverviewCards metrics={metrics} loading={loading} />

      <div className="grid gap-6 lg:grid-cols-2">
        <BlobsChart data={metrics?.blobsOverTime || []} />
        <StorageDistribution data={metrics?.sizeDistribution || []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopPublishers publishers={metrics?.topPublishers || []} />
        <section>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-2 text-sm font-medium">Quick Actions</h3>
            <div className="space-y-2">
              <a
                href="/chat"
                className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  🤖
                </span>
                <span>Ask AI about storage trends</span>
              </a>
              <a
                href="/explorer"
                className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                  🔍
                </span>
                <span>Browse recent blobs</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  )
}
