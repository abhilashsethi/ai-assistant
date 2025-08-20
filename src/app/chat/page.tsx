"use client"

import { useState } from "react"
import { WeatherCard } from "@/components/WeatherCard"

type Message = {
  role: "user" | "assistant"
  content: string
  tool?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  async function sendMessage() {
    const newMessages: Message[] = [...messages, { role: "user" as const, content: input }]

    setMessages(newMessages)
    setInput("")

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    })

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let assistantMessage = ""

    while (true) {
      const { value, done } = await reader!.read()
      if (done) break
      assistantMessage += decoder.decode(value)

      try {
        const parsed = JSON.parse(assistantMessage)
        if (parsed.location && parsed.temperature) {
          setMessages([
            ...newMessages,
            { role: "assistant" as const, content: assistantMessage },
          ])
          return
        }
      } catch {
        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantMessage },
        ])
      }
    }
  }

  return (
    <main className="p-6">
      <div className="space-y-4">
        {messages.map((m, i) => {
          if (m.tool === "getWeather") {
            const data = JSON.parse(m.content)
            return (
              <WeatherCard
                key={i}
                location={data.location}
                temperature={data.temperature}
                description={data.description}
              />
            )
          }
          return (
            <div
              key={i}
              className={m.role === "user" ? "text-blue-600" : "text-green-600"}
            >
              <b>{m.role}:</b> {m.content}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white">
          Send
        </button>
      </div>
    </main>
  )
}
