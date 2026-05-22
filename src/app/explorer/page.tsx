"use client"

import { useEffect, useState } from "react"
import { BlobTable } from "@/components/Explorer/BlobTable"
import type { BlobInfo } from "@/lib/walrus"

export default function ExplorerPage() {
  const [blobs, setBlobs] = useState<BlobInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlobs() {
      try {
        const res = await fetch("/api/blobs")
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        if (Array.isArray(data)) {
          setBlobs(data)
        } else {
          setError("No blob data available. Configure Tatum API to fetch Walrus blobs.")
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load blobs")
      } finally {
        setLoading(false)
      }
    }
    fetchBlobs()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Blob Explorer</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse and search blobs stored on Walrus
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by publisher address..."
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900"
        />
        <select className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-600 dark:bg-zinc-900">
          <option>All sizes</option>
          <option>&lt; 1 KB</option>
          <option>1-10 KB</option>
          <option>10-100 KB</option>
          <option>&gt; 1 MB</option>
        </select>
      </div>

      <BlobTable blobs={blobs} loading={loading} />

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-600 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400">
          {error}
        </div>
      )}
    </div>
  )
}
