"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, shortenAddress, formatTimestamp } from "@/lib/utils"
import type { BlobInfo } from "@/types"

interface BlobTableProps {
  blobs: BlobInfo[]
  loading?: boolean
}

type SizeFilter = "all" | "lt_1kb" | "1_10kb" | "10_100kb" | "gt_1mb"

function sizeFilterFn(blob: BlobInfo, filter: SizeFilter): boolean {
  switch (filter) {
    case "lt_1kb":
      return blob.size < 1024
    case "1_10kb":
      return blob.size >= 1024 && blob.size < 10240
    case "10_100kb":
      return blob.size >= 10240 && blob.size < 102400
    case "gt_1mb":
      return blob.size >= 1048576
    default:
      return true
  }
}

export function BlobTable({ blobs, loading }: BlobTableProps) {
  const [search, setSearch] = useState("")
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("all")

  const filteredBlobs = useMemo(() => {
    return blobs.filter((blob) => {
      const matchesSearch =
        !search ||
        blob.publisher.toLowerCase().includes(search.toLowerCase()) ||
        blob.id.toLowerCase().includes(search.toLowerCase())
      const matchesSize = sizeFilterFn(blob, sizeFilter)
      return matchesSearch && matchesSize
    })
  }, [blobs, search, sizeFilter])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Blob Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Blob Explorer
            <span className="ml-2 text-xs font-normal text-zinc-400">
              ({filteredBlobs.length} of {blobs.length} blobs)
            </span>
          </CardTitle>
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by publisher..."
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900"
            />
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm outline-none dark:border-zinc-600 dark:bg-zinc-900"
            >
              <option value="all">All sizes</option>
              <option value="lt_1kb">&lt; 1 KB</option>
              <option value="1_10kb">1-10 KB</option>
              <option value="10_100kb">10-100 KB</option>
              <option value="gt_1mb">&gt; 1 MB</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredBlobs.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-400">
            No blobs match your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-700">
                  <th className="pb-3 pr-4 font-medium">Publisher</th>
                  <th className="pb-3 pr-4 font-medium">Size</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 font-medium">Digest</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlobs.map((blob) => (
                  <tr
                    key={blob.id}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                  >
                    <td className="py-3 pr-4">
                      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                        {shortenAddress(blob.publisher)}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-medium">
                      {formatBytes(blob.size)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                        {blob.storageType}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-zinc-500">
                      {formatTimestamp(blob.timestamp)}
                    </td>
                    <td className="py-3 font-mono text-xs text-zinc-400">
                      {shortenAddress(blob.digest)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
