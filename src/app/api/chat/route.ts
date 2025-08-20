import { NextRequest } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getWeather } from "@/lib/tools/weather"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const model = openai("gpt-4o-mini") // v1 model


  const result = streamText({
    model,
    messages,
    tools: { getWeather },
  })

  return result.toTextStreamResponse()
}
