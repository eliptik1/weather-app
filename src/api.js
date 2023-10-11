import { key } from "./api-key"

export async function getCurrentWeather() {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=istanbul`, { mode: 'cors' })
    const data = await response.json()
    console.log(data)
  }
  catch {
    console.log("ERROR:",err)
  }
}
