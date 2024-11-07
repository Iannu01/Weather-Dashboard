import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData, isCelsius, toggleUnit }) => {
  if (!weatherData) return null;

  // Get the icon code from the weather data
  const iconCode = weatherData.weather[0].icon; // This is the icon code provided by OpenWeatherMap

  // Construct the URL for the weather icon
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const temp = isCelsius
    ? (weatherData.main.temp - 273.15).toFixed(1)
    : ((weatherData.main.temp - 273.15) * 9 / 5 + 32).toFixed(1);

  return (
    <div className="weather-display">
      <h3>{weatherData.name}</h3>
      <div className="weather-icon">
        {/* Display the weather icon dynamically */}
        <img src={iconUrl} alt={weatherData.weather[0].main} />
      </div>
      <p>{weatherData.weather[0].description}</p>
      <div className="temp">
        {temp}°{isCelsius ? 'C' : 'F'}
      </div>
      <button onClick={toggleUnit} className="unit-toggle">
        Toggle °C / °F
      </button>
      <div className="forecast">
        {forecastData?.list.slice(0, 5).map((forecast, idx) => (
          <div key={idx} className="forecast-item">
            <span>{new Date(forecast.dt * 1000).toLocaleDateString()}</span>
            <div>{forecast.weather[0].main}</div>
            {/* Display forecast weather icon dynamically */}
            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
