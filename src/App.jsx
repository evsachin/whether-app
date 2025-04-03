import { useState } from "react";
import axios from "axios";

const API_KEY = "25dbdfc62593ed95eed2942b88484c22"; // Replace with your OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black ">
      <div className="border-2 border-black p-18 rounded-4xl bg-amber-300 m-4">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          className="p-2 text-black rounded bg-gray-300"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 rounded"
          onClick={fetchWeather}
        >
          Get Weather
        </button>

        {weather && (
          <div className="mt-4 bg-red-200 p-4 rounded-2xl border-2">
            <h2 className="text-2xl">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg">🌡 {weather.main.temp}°C</p>
            <p>☁ {weather.weather[0].description}</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
