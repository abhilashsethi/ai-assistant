import { NextRequest } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getWeather } from "@/lib/tools/weather" // 👈 your tool

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages,
    tools: { getWeather },
  })

  return result.toTextStreamResponse()
}
