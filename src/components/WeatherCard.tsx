type WeatherProps = {
  location: string
  temperature: number
  description: string
}

export function WeatherCard({ location, temperature, description }: WeatherProps) {
  return (
    <div className="p-4 rounded-2xl shadow bg-blue-100 text-blue-900 max-w-sm">
      <h2 className="font-bold text-lg">{location}</h2>
      <p className="text-2xl">{temperature}°C</p>
      <p className="italic">{description}</p>
    </div>
  )
}
