import { getCoordinates } from "./api"
import format from "date-fns/format"

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
  if (searchValue.replace(/\s+/g, "") == "") return
  searchInput.value = ""
  try {
    const result = await getCoordinates(searchValue)
    const todayData = result.todayData
    const weeklyData = result.weeklyData
    errorMessage.classList.add("hidden")
    displayToday(todayData)
    displayWeek(weeklyData)
  } catch (err) {
    console.log("ErrorGetCoordinates", err)
    errorMessage.classList.remove("hidden")
    errorMessage.textContent = `City ${searchValue} not found`
  }
}

function displayToday(data) {
  cityName.textContent = `${data.city} - ${data.country}`
  weatherDesc.textContent = data.desc
  currentTemp.textContent = `${data.temp.toFixed(1)} °C`
  currentTempRange.textContent = `${data.tempMin.toFixed(1)} °C / ${data.tempMax.toFixed(1)} °C`

  feelsLike.textContent = `${data.feelsLike.toFixed(1)} °C`
  humidity.textContent = `${data.humidity}%`
  rain.textContent = `${(data.rain * 100).toFixed()}%`
  wind.textContent = `${data.wind.toFixed()} m/s`
  uvi.textContent = `${data.uv}`
}

function displayWeek(data) {
  weeklyContainer.innerHTML = ""
  for (let i = 0; i < 5; i++) {
    console.log()
    weeklyContainer.innerHTML += `
      <li class="bg-green-200 flex flex-col items-center border-2 border-green-500 p-4"> 
        <span class="day">${format(new Date(data.day[i]*1000), 'EEEE')}</span>
        <p class="desc">${data.desc[i]}</p>
        <div class="temp w-full flex justify-between mt-auto">
            <div class="temp-day">${data.tempDay[i].toFixed()}</div>
            <div class="temp-night">${data.tempNight[i].toFixed()}</div>
        </div>
      </li>`
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