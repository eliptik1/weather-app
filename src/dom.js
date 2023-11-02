import { getCoordinates } from "./api"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

const errorMessage = document.querySelector("#error-message")

const cardToday = document.querySelector("#card-today")
const cityName = document.querySelector("#city-name")
const localDate = document.querySelector("#local-date")
const localTime = document.querySelector("#local-time")
const currentTemp = document.querySelector("#current-temp")
const currentTempRange = document.querySelector("#current-temp-range")
const weatherDesc = document.querySelector("#weather-description")
const iconToday = document.querySelector("#icon-today")

const feelsLike = document.querySelector("#feels-like")
const humidity = document.querySelector("#humidity")
const rain = document.querySelector("#rain")
const wind = document.querySelector("#wind")
const uvi = document.querySelector("#uvi")

const weeklyContainer = document.querySelector("#weekly-container")
const main = document.querySelector("main")
const loader = document.querySelector("#loader")

export async function fetchData(searchValue = "istanbul") {
  if (searchValue.replace(/\s+/g, "") == "") return
  searchInput.value = ""
  main.classList.add("hidden")
  loader.style.display = "block";
  try {
    const result = await getCoordinates(searchValue)
    const todayData = result.todayData
    const weeklyData = result.weeklyData
    errorMessage.classList.add("hidden")
    main.classList.remove("hidden")
    loader.style.display = "none";
    displayToday(todayData)
    displayWeek(weeklyData)
  } catch (err) {
    console.log("ErrorGetCoordinates", err)
    errorMessage.classList.remove("hidden")
    errorMessage.textContent = `City ${searchValue} not found`
    loader.style.display = "none";
  }
}

function displayToday(data) {
  cityName.textContent = `${data.city} - ${data.country}`
  localDate.textContent = data.localDate
  localTime.textContent = data.localTime
  weatherDesc.textContent = data.desc
  iconToday.innerHTML = `<img src="../src/icons/${data.iconId}.svg" alt="${data.desc}"></img>`
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
    weeklyContainer.innerHTML += `
      <li class="bg-green-200 flex flex-col items-center border-2 border-green-500 p-4"> 
        <span class="day">${data.day[i]}</span>
        <p class="desc">${data.desc[i]}</p>
        <img src="../src/icons/${data.iconId[i]}.svg" alt="${data.desc[i]}"></img>
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