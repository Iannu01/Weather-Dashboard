import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state for API calls

  useEffect(() => {
    axios.get('http://localhost:5000/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const searchCity = async (cityName) => {
    setCity(cityName);
    setLoading(true); // Start loading
    try {
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cf5710eeb3b95628588a321e9173def1`);
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cf5710eeb3b95628588a321e9173def1`);
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
      localStorage.setItem('lastCity', cityName); // Store in localStorage
    } catch (err) {
      console.error("City not found", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCityClick = async (cityName) => {
    setCity(cityName);
    setLoading(true); // Start loading
    try {
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cf5710eeb3b95628588a321e9173def1`);
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cf5710eeb3b95628588a321e9173def1`);
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      console.error("City not found", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const toggleUnit = () => {
    setIsCelsius(prev => !prev);
  };

  const toggleFavorite = (cityName) => {
    const isFavorite = favorites.find(fav => fav.name === cityName);
    if (isFavorite) {
      axios.delete(`http://localhost:5000/favorites/${isFavorite.id}`)
        .then(() => {
          setFavorites(favorites.filter(fav => fav.name !== cityName));
        });
    } else {
      axios.post('http://localhost:5000/favorites', { name: cityName, forecast: forecastData?.list })
        .then(res => {
          setFavorites([...favorites, res.data]);
        });
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <Search onSearch={searchCity} />
      <div className="main-content">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <WeatherDisplay
            weatherData={weatherData}
            forecastData={forecastData}
            isCelsius={isCelsius}
            toggleUnit={toggleUnit}
          />
        )}
        <Favorites
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onCityClick={handleCityClick}
        />
        {weatherData && (
          <div className="favorite-toggle">
            <button className={`favorite-heart ${favorites.some(fav => fav.name === weatherData.name) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(weatherData.name)}>
              ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
