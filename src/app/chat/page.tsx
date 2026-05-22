"use client"

import { ChatInterface } from "@/components/Chat/ChatInterface"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Analytics</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ask questions about Walrus storage data in plain English
        </p>
      </div>

      <ChatInterface />
    </div>
  )
}
