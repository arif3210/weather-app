import {React, useState} from "react";
import axios from 'axios'
function MainPage(){
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');


    const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast App</h1>
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
        </header>
        </div>
    )
}
export default MainPage