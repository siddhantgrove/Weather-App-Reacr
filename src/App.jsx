import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi"

function App() {
  const [City, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const API_KEY = "f08ca2d6b7980c61e42a953f7a25263c"


  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${API_KEY}`
      )
      setWeather(res.data)
      console.log(res.data) 
    } catch (error) {
      console.error(error.response?.data || error.message)
      alert("City not Found ❌")
    }
  }


  const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny className="text-red-500 text-6xl mx-auto" />
    case "Clouds":
      return <WiCloud className="text-gray-500 text-6xl mx-auto" />
    case "Rain":
      return <WiRain className="text-blue-500 text-6xl mx-auto" />
    case "Snow":
      return <WiSnow className="text-blue-300 text-6xl mx-auto" />
    case "Thunderstorm":
      return <WiThunderstorm className="text-purple-600 text-6xl mx-auto" />
    case "Mist":
    case "Fog":
      return <WiFog className="text-gray-400 text-6xl mx-auto" />
    default:
      return <WiDaySunny className="text-yellow-500 text-6xl mx-auto" />
  }
}



  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">🌦️ Weather App</h1>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city"
          value={City}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg text-black outline-none"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </div>

      {/* Weather Info */}
     {weather && (
  <div className="mt-6 p-6 bg-white text-gray-800 rounded-xl shadow-lg text-center">
    {/* Weather Icon */}
    {getWeatherIcon(weather.weather[0].main)}

    <h2 className="text-2xl font-semibold">{weather.name}</h2>
    <p className="text-lg capitalize">{weather.weather[0].description}</p>
    <p className="text-3xl ">{weather.main.temp}°C</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind: {weather.wind.speed} m/s</p>
  </div>
)}
    </div>
  )

};



export default App
