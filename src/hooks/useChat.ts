"use client"

import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types"

export interface UseChatReturn {
  messages: ChatMessage[]
  input: string
  setInput: (val: string) => void
  loading: boolean
  generatingReport: boolean
  handleSend: (overrideMsg?: string) => Promise<void>
  handleGenerateReport: () => Promise<void>
  endRef: React.RefObject<HTMLDivElement | null>
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        '**Case W-0042 — opened just now.**\n\nGood evening, Watson. I\'ve been studying the Walrus storage network rather closely. The evidence locker is filling up — and I have some theories.\n\nAsk me about **publishers**, **blob anomalies**, **storage trends**, or request a **full case report**. I cite every claim with evidence from the chain.\n\n*Puffs pipe thoughtfully.*',
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatingReport, setGeneratingReport] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend(overrideMsg?: string) {
    const msg = overrideMsg ?? input
    if (!msg.trim() || loading) return

    const userMsg: ChatMessage = { role: "user", content: msg }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            e instanceof Error
              ? `Error: ${e.message}`
              : "Sorry, I couldn't process that request. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateReport() {
    setGeneratingReport(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Generate a report", generateReport: true }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Report generation failed" }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `**Weekly Analytics Report**\n\n${data.response}`,
        },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: e instanceof Error ? `Error: ${e.message}` : "Sorry, report generation failed.",
        },
      ])
    } finally {
      setGeneratingReport(false)
    }
  }

  return {
    messages,
    input,
    setInput,
    loading,
    generatingReport,
    handleSend,
    handleGenerateReport,
    endRef,
  }
}
