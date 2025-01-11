import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "your_openweather_api_key";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Καιρικά Δεδομένα</h2>
      {weather ? (
        <div>
          <p>Θερμοκρασία: {weather.main.temp}°C</p>
          <p>Υγρασία: {weather.main.humidity}%</p>
          <p>Ταχύτητα Ανέμου: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Φόρτωση δεδομένων...</p>
      )}
    </div>
  );
};

export default Weather;
