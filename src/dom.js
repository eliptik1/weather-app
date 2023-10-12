import { getCoordinates } from "./api"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

function searchData(){
  getCoordinates(searchInput.value)
}

searchBtn.addEventListener("click", searchData)