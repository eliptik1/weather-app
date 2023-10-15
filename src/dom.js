import { getCoordinates } from "./api"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

const errorMessage = document.querySelector("#error-message")

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

const weeklyContainer = document.querySelector("#weekly-container")

export async function fetchData(searchValue = "istanbul") {
  if(searchValue.replace(/\s+/g, "") == "") return
  searchInput.value = ""
  try {
    const result = await getCoordinates(searchValue)
    const todayData = result.todayData
    const weeklyData = result.weeklyData
    errorMessage.classList.add("hidden")

    cityName.textContent = `${todayData.city} - ${todayData.country}`
    weatherDesc.textContent = todayData.desc
    currentTemp.textContent = `${todayData.temp.toFixed(1)} °C`
    currentTempRange.textContent = `${todayData.tempMin.toFixed(1)} °C / ${todayData.tempMax.toFixed(1)} °C`

    feelsLike.textContent = `${todayData.feelsLike.toFixed(1)} °C`
    humidity.textContent = `${todayData.humidity}%`
    rain.textContent = `${(todayData.rain * 100).toFixed()}%`
    wind.textContent = `${todayData.wind.toFixed()} m/s`
    uvi.textContent = `${todayData.uv}`

  } catch (err) {
    console.log("ErrorGetCoordinates", err)
    errorMessage.classList.remove("hidden")
    errorMessage.textContent = `City ${searchValue} not found`
  }
}

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value
  fetchData(searchValue)
})
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchValue = searchInput.value
    fetchData(searchValue)
  }
})