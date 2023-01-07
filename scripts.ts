// selecting HTML elements
const temperature = document.querySelector('.temperature')
const temperatureBox = document.querySelector('.temperature__box')
const description = document.querySelector('.description')
const country = document.querySelector('.country')
const city = document.querySelector('.city')
const icon = document.querySelector('.icon') as HTMLImageElement
const time = document.querySelector('.time')
const currDate = document.querySelector('.dayAndMonth')

// API key
const key = '22e4c41840b694191cbf19af3abd264e40'

// geocode API
//const geocode = `http://api.openweathermap.org/geo/1.0/direct?q=London,826&limit=3&appid=e4c41840b694191cbf19af3abd264e40`

// fetching the API data
// const api = `https://api.openweathermap.org/data/2.5/weather?lat=56.9677&lon=24.1056&appid=e4c41840b694191cbf19af3abd264e40&units=metric`

// getting user's coords and feeding them to the API 
const getLocation = navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = {lat: position.coords.latitude, long: position.coords.longitude}
    
    const jQueryApi = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${key}&units=metric`
    fetch(jQueryApi).then(function(response) {

            let data = response.json()
            console.log(data)
            return data
        })

    .then(function(data) {
    // selecting specific data from api
    const getWeather = {
    location: data.sys.country,
    cityData: data.name,
    currentIcon: data.weather[0].icon,
    weather_temperature: data.main.temp,
    weather_description: data.weather[0].description
    }
    const weather_descriptionResult = getWeather.weather_description.charAt(0).toUpperCase() + getWeather.weather_description.slice(1)

    // inserting the data in HTML
    temperature.innerHTML = `${Math.floor(getWeather.weather_temperature)}°C`
    country.innerHTML = getWeather.location
    description.innerHTML = weather_descriptionResult
    city.innerHTML = getWeather.cityData
    icon.src = `assets/images/${getWeather.currentIcon}.png`

    // changing metrics
    let normalModeOn = true

    temperatureBox.addEventListener('click', () => {
        // check if normal mode
        if(normalModeOn === true) {
        // converting C to F
        const celsiusToFahrenheit = (9/5 * getWeather.weather_temperature) + 32
        const roundTemp = Math.floor(celsiusToFahrenheit)
        // displaying new values
        temperature.innerHTML = `${roundTemp}°F`
        // now is not normalmode anymore :D
        normalModeOn = false
        } else {
        // show temp in Celsius
        temperature.innerHTML = `${Math.floor(getWeather.weather_temperature)}°C`
        // normal is again true
        normalModeOn = true
        }
    })
 }) 

})

// date and time
import { format } from 'date-fns'

const appTime = () => {
  time.innerHTML = format(new Date(), "HH:mm")
  currDate.innerHTML = format(new Date(), "dd MMM")

  setTimeout(appTime, 1000)
}

appTime()





