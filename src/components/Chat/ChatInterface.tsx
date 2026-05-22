"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User, FileText } from "lucide-react"
import type { ChatMessage } from "@/types"

export function ChatInterface() {
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
  const endRef = useRef<HTMLDivElement>(null)

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
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process that request. Please try again.",
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
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `📊 **Weekly Analytics Report**\n\n${data.response}` },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, report generation failed." },
      ])
    } finally {
      setGeneratingReport(false)
    }
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-base">AI Analytics Chat</CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateReport}
          disabled={generatingReport}
        >
          <FileText className="mr-2 h-4 w-4" />
          {generatingReport ? "Generating..." : "Generate Report"}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <User className="h-4 w-4 text-zinc-600" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="max-w-[80%] rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.1s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </CardContent>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Walrus analytics..."
            className="flex-1 rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
