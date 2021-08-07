import './App.css';
import React, { useState } from 'react';

function App() {
  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchDef = () => {
    fetch(`${api.base}weather?q="New+Delhi"&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery("");
    })
  }
  
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        })
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className = "app">
      <div className={((typeof weather.main != 'undefined')? ((weather.main.temp > 20)? "container":"container-cold"): "container")}>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search" onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>

        {(typeof weather.main != 'undefined')? (
          <div className="main">
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </div>
    </div>
  );
}

export default App;
