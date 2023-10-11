import { key } from "./api-key"

export async function getCurrentWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`, { mode: 'cors' })
    const data = await response.json()
    console.log(data)
  }
  catch {
    console.log("ERROR:",err)
  }
}
