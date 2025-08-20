"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")

  if (!session) {
    return <p className="p-4 text-center">You must be logged in to view this page.</p>
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    // later: send to AI API + get response
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session.user?.image ?? ""} />
            <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{session.user?.name}</span>
        </div>
        <span className="text-sm text-gray-500">AI Assistant</span>
      </header>

      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">Start chatting...</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-md ${m.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
              }`}
          >
            {m.content}
          </div>
        ))}
      </section>

      {/* Input */}
      <footer className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </footer>
    </main>
  )
}
