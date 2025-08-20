import { z } from "zod"

const WeatherSchema = z.object({
  location: z.string().min(1, "Location is required"),
})

const parameters: any = {
  location: "",
}

export const getWeather = {
  parameters,

  async execute(params: any) {
    // Validate input at runtime
    const { location } = WeatherSchema.parse(params)

    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) throw new Error("Missing OPENWEATHER_API_KEY")

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )}&appid=${apiKey}&units=metric`

    const res = await fetch(url)
    const data = await res.json()

    if (data.cod !== 200) return { error: data.message }

    return {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    }
  },
}
