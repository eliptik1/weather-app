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
    errorMessage.innerHTML = `City <span class="font-bold">${searchValue}</span> not found`
    loader.style.display = "none";
  }
}

function displayToday(data) {
  cityName.textContent = `${data.city} - ${data.country}`
  localDate.textContent = data.localDate
  localTime.textContent = data.localTime
  weatherDesc.textContent = data.desc
  iconToday.innerHTML = `<img class="${getShadow(data.iconId)}" src="icons/${data.iconId}.svg" alt="${data.desc}"></img>`
  currentTemp.textContent = `${data.temp.toFixed(1)}°c`
  currentTempRange.textContent = `${data.tempMin.toFixed(1)}°c / ${data.tempMax.toFixed(1)}°c`

  feelsLike.textContent = `${data.feelsLike.toFixed(1)}°c`
  humidity.textContent = `${data.humidity}%`
  rain.textContent = `${(data.rain * 100).toFixed()}%`
  wind.textContent = `${data.wind.toFixed()} m/s`
  uvi.textContent = `${data.uv}`
  uvi.className = `${getUviColor(data.uv)} rounded-full text-white text-xl w-9 h-9 text-center flex justify-center items-center`
}

function displayWeek(data) {
  weeklyContainer.innerHTML = ""
  for (let i = 0; i < 5; i++) {
    weeklyContainer.innerHTML += `
      <li class="bg-green-200 flex flex-1 w-1/6 max-sm:w-36 flex-col items-center p-4 rounded-2xl my-shadow max-sm:text-sm"> 
        <span class="day font-semibold">${data.day[i]}</span>
        <p class="text-center capitalize-first">${data.desc[i]}</p>
        <img class="${getShadow(data.iconId[i])} mt-auto" src="icons/${data.iconId[i]}.svg" alt="${data.desc[i]}"></img>
        <div class="temp w-full flex justify-center text-lg">
            <div class="temp-day font-semibold">${data.tempDay[i].toFixed()}°</div> &nbsp <span>/&nbsp${data.tempNight[i].toFixed()}°</span>
        </div>
      </li>`
  }
}

function getShadow(id){
  if (id == "01d"){
    return "drop-shadow-[0_0_15px_#ffd400]" //clear day
  } else if (id.includes("50")){
    return "drop-shadow-[0_0_15px_#000000db]" //foggy weather
  } else if (id.includes("d")){
    return "drop-shadow-[0_0_15px_#738c95c2]" //night
  } else return "drop-shadow-[0_0_15px_#002eff94]"
}

function getUviColor(uvi){
  let color = ""
    if(uvi <=2 ){
      color = "bg-[#91c700]"
    } else if(uvi <= 5){
      color = "bg-[#ffb800]"
    } else if(uvi <= 7){
      color = "bg-[#ff8d00]"
    } else if(uvi <= 10){
      color = "bg-[#ff3c00]"
    } else {
      color = "bg-[#9936d4]"
    }
  return color
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