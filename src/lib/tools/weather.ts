import { tool } from "ai"

export const getWeather = tool({
  name: "getWeather",
  description: "Get the current weather for a city",

  // 👇 must be a valid JSON Schema
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The name of the city to fetch weather for",
      },
    },
    required: ["location"],
  },

  // 👇 make sure execute is typed properly
  async execute({ location }: { location: any }) {
    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      throw new Error("Missing OPENWEATHER_API_KEY in environment variables")
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`

    const res = await fetch(url)
    const data = await res.json()

    if (data.cod !== 200) {
      return { error: data.message }
    }

    return {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    }
  },
})
