"use client"

import { BlobTable } from "@/components/Explorer/BlobTable"
import { useBlobs } from "@/hooks/useBlobs"

export default function ExplorerPage() {
  const { blobs, loading, error } = useBlobs()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Blob Explorer</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse and search blobs stored on Walrus
        </p>
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
