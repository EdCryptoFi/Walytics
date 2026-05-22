"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, shortenAddress, formatTimestamp } from "@/lib/utils"
import type { BlobInfo } from "@/lib/walrus"

interface BlobTableProps {
  blobs: BlobInfo[]
  loading?: boolean
}

export function BlobTable({ blobs, loading }: BlobTableProps) {
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
        <CardTitle className="text-sm font-medium">
          Blob Explorer
          <span className="ml-2 text-xs font-normal text-zinc-400">
            ({blobs.length} blobs)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {blobs.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-400">
            No blobs found. Connect a Tatum API key to start.
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
                {blobs.map((blob) => (
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
