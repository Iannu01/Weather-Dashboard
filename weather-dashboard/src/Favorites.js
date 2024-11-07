import React from 'react';

const Favorites = ({ favorites, onToggleFavorite, onCityClick }) => {
  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city.id} className="favorite-item">
            <div className="favorite-city">
              <span onClick={() => onCityClick(city.name)}>{city.name}</span>
              <button className="favorite-heart favorited" onClick={() => onToggleFavorite(city.name)}>
                ❤️
              </button>
            </div>
            <div className="forecast-preview">
              {city.forecast && city.forecast[0]?.weather[0]?.main}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
