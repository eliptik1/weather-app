import { getCurrentWeather } from "./api"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

function searchData(){
  getCurrentWeather(searchInput.value)
}

searchBtn.addEventListener("click", searchData)