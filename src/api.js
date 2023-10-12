import { key } from "./api-key"

export async function getCoordinates(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`, { mode: 'cors' })
    const data = await response.json()
    const coordinates = data.coord
    const cityName = data.name
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' }); //Convert international region codes to English country names
    const country = regionName.of(data.sys.country)
    getWeatherData(coordinates, cityName, country)
  }
  catch (err) {
    console.log("ERROR:", err)
  }
}

async function getWeatherData(coord, city, country) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=metric&appid=${key}`, { mode: 'cors' })
    const data = await response.json()
    const weatherData = {
      city: city,
      country: country,
      desc: data.current.weather[0].description,
      temp: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      rain: data.daily[0].pop,
      wind: data.current.wind_speed,
      tempMin: data.daily[0].temp.min,
      tempMax: data.daily[0].temp.max,
      uv: data.current.uvi
    }
    console.log(weatherData)
    
  }
  catch (err) {
    console.log("ERROR-2:", err)
  }
}
