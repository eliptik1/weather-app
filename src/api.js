import { key } from "./api-key"
import { addSeconds, format } from "date-fns"

export async function getCoordinates(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`, { mode: 'cors' })
    const data = await response.json()
    const coordinates = data.coord
    const cityName = data.name
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' }); //Convert international region codes to English country names
    const country = regionName.of(data.sys.country)
    const weatherData = await getWeatherData(coordinates, cityName, country)
    return weatherData
  }
  catch (err) {
    throw err
  }
}

async function getWeatherData(coord, city, country) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=metric&appid=${key}`, { mode: 'cors' })
    const data = await response.json()

    const currentDate = new Date()
    const timeZoneOffset = data.timezone_offset
    const localOffset = currentDate.getTimezoneOffset()*60; //UTC Timezone offset in seconds
    const timeDifference = timeZoneOffset + localOffset
    const localTime = addSeconds(currentDate, timeDifference)
    const todayData = {
      city: city,
      country: country,
      localDate: format(localTime, 'EEEE, d MMMM yyyy'),
      localTime: format(localTime, 'HH:mm'),
      desc: data.current.weather[0].description,
      iconId: data.current.weather[0].icon,
      temp: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      rain: data.daily[0].pop,
      wind: data.current.wind_speed,
      tempMin: data.daily[0].temp.min,
      tempMax: data.daily[0].temp.max,
      uv: Math.round(data.current.uvi)
    }

    const weeklyData = {
      day:[],
      desc:[],
      iconId:[],
      tempDay:[],
      tempNight:[]
    }

    for (let index = 1; index <= 5; index++) {
      const day = data.daily[index];
      weeklyData.day.push(format(day.dt*1000, 'EEEE'))
      weeklyData.desc.push(day.weather[0].description) //could be also day.weather.main 
      weeklyData.iconId.push(day.weather[0].icon)
      weeklyData.tempDay.push(day.temp.day)
      weeklyData.tempNight.push(day.temp.night)
    }

    return { todayData, weeklyData }
  }
  catch (err) {
    console.log("ERROR-2:", err)
  }
}
