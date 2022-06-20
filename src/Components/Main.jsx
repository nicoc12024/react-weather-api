import React, { useState } from "react";
import "../stylesheets/Main.css";
import axios from "axios";

function Main() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState("");

  const apiKey = "f1e7121e219070f4e629e794f41df9b7";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (e) => {
    e.preventDefault();
    setData({});
    setIcon("");
    document.querySelector(".info-text").classList.add("pending");
    document.querySelector(".info-text").innerHTML = "Searching...";
    document.querySelector(".info-text").classList.remove("error");

    axios
      .get(url)
      .then((response) => {
        const imgSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        setIcon(imgSrc);
        setData(response.data);
        document.querySelector(".info-text").classList.remove("pending");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          document.querySelector(".info-text").classList.remove("pending");
          document.querySelector(".info-text").classList.add("error");
          document.querySelector(".info-text").innerHTML = "Error, city not found!";
        }
      });
  };

  const handleGetLocation = () => {
    setData({});
    setIcon("");

    document.querySelector(".info-text").classList.add("pending");
    document.querySelector(".info-text").innerHTML = "Searching...";
    document.querySelector(".info-text").classList.remove("error");

    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      let urlGetLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios.get(urlGetLocation).then((response) => {
        const imgSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        setIcon(imgSrc);
        setData(response.data);
        setLocation(response.data.name);
        document.querySelector(".info-text").classList.remove("pending");
      });
    });
  };

  return (
    <div className="main">
      <div className="weather-content">
        <div id="title" onClick={() => window.location.reload()}>
          <h2>Weather App</h2>
        </div>
        <form className="form" onSubmit={searchLocation}>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter city name"
            spellCheck="false"
            required
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <div className="separator"></div>
          <p className="button" onClick={handleGetLocation}>
            Get Location
          </p>
        </form>

        {/* Weather Information */}
        <div className="card">
          <div className="infoTop">
            <p className="info-text">Searching...</p>

            {/* Temperature */}
            {data.main ? (
              <div className="temperature">{data.main.temp.toFixed()}° C </div>
            ) : null}

            {/* Weather */}
            {data.main ? <div className="weather">{data.weather[0].main} </div> : null}

            {/* Icon */}
            {icon ? <img src={icon} alt="icon" width={"50px"} /> : null}

            {/* Location */}
            {data.main ? (
              <div className="location">
                <i className="fa-solid fa-location-dot"></i> {data.name}
              </div>
            ) : null}
          </div>

          {/* Info Bottom */}
          {data.main ? (
            <div className="infoBottom">
              <div className="infoLeft">
                <p>
                  <i className="fa-solid fa-temperature-half"></i>
                  {data.main.feels_like.toFixed()}° C <br />
                  <span className="infoBottomSpan">Feels like</span>
                </p>
              </div>

              <div className="infoRight">
                <p>
                  <i className="fa-solid fa-droplet"></i>
                  {data.main.humidity.toFixed()}% <br />
                  <span className="infoBottomSpan">Humidity</span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Main;
