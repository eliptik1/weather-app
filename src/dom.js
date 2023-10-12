import { getCoordinates } from "./api"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

const cardToday = document.querySelector("#card-today")
const cityName = document.querySelector("#city-name")
const currentTemp = document.querySelector("#current-temp")
const currentTempRange = document.querySelector("#current-temp-range")
const weatherDesc = document.querySelector("#weather-description")

const feelsLike = document.querySelector("#feels-like")
const humidity = document.querySelector("#humidity")
const rain = document.querySelector("#rain")
const wind = document.querySelector("#wind")
const uvi = document.querySelector("#uvi")


export async function fetchData(searchValue = "istanbul") {
  try {
    const result = await getCoordinates(searchValue)

    cityName.textContent = `${result.city} - ${result.country}`
    weatherDesc.textContent = result.desc
    currentTemp.textContent = `${result.temp.toFixed(1)} °C`
    currentTempRange.textContent = `${result.tempMin.toFixed(1)} °C / ${result.tempMax.toFixed(1)} °C`

    feelsLike.textContent = `${result.feelsLike.toFixed()} °C`
    humidity.textContent = `${result.humidity}%`
    rain.textContent = `${(result.rain * 100).toFixed()}%`
    wind.textContent = `${result.wind.toFixed()} m/s`
    uvi.textContent = `${result.uv}`

  } catch (err) {
    console.log("ErrorGetCoordinates", err)
  }
}

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value
  fetchData(searchValue)
})