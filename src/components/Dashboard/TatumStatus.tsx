"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export function TatumStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [blockHeight, setBlockHeight] = useState<string | null>(null)

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/tatum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "sui_getLatestCheckpointSequenceNumber",
            params: [],
          }),
        })
        const json = await res.json()
        if (json.result) {
          setBlockHeight(Number(json.result).toLocaleString())
          setStatus("connected")
        } else {
          setStatus("error")
        }
      } catch {
        setStatus("error")
      }
    }
    check()
  }, [])

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardContent className="flex items-center gap-3 p-4">
        {status === "loading" && (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
            <span className="text-sm text-zinc-500">Checking Tatum connection...</span>
          </>
        )}
        {status === "connected" && (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div className="text-sm">
              <span className="font-medium text-green-700 dark:text-green-400">Tatum Sui RPC Connected</span>
              {blockHeight && (
                <span className="ml-2 text-zinc-500">· Block #{blockHeight}</span>
              )}
            </div>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-amber-600 dark:text-amber-400">
              Tatum RPC unavailable (dashboard uses demo data)
            </span>
          </>
        )}
      </CardContent>
    </Card>
  )
}
