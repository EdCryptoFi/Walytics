"use client"

import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types"

export interface UseChatReturn {
  messages: ChatMessage[]
  input: string
  setInput: (val: string) => void
  loading: boolean
  generatingReport: boolean
  handleSend: () => Promise<void>
  handleGenerateReport: () => Promise<void>
  endRef: React.RefObject<HTMLDivElement | null>
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        'Hi! I\'m Walytics AI. Ask me anything about Walrus storage analytics. For example:\n\n- **"Who is the top publisher this week?"**\n- **"What\'s the average blob size?"**\n- **"Generate a weekly report"**\n- **"How is storage usage trending?"**',
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatingReport, setGeneratingReport] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMsg: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
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
