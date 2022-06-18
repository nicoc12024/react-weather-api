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

    axios
      .get(url)
      .then((response) => {
        const imgSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        setIcon(imgSrc);
        setData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("City Not Found");
        }
      });
  };

  return (
    <div className="main">
      <div className="weather-content">
        <div id="title">
          <h2>Weather App</h2>
        </div>
        <form className="form" onSubmit={searchLocation}>
          <p className="info-text">Please enter a valid city name</p>
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
          <button type="submit">Search</button>
        </form>

        {/* Weather Information */}
        <div className="card">
          <div className="infoTop">
            {/* Temperature */}
            <div className="temperature">
              {data.main ? <p>{data.main.temp.toFixed()}° C</p> : null}
            </div>

            {/* Weather */}
            <p className="weather"> {data.weather ? data.weather[0].main : null}</p>

            {/* Icon */}
            {icon ? <img src={icon} alt="icon" width={"50px"} /> : null}

            {/* Location */}
            <p className="location">
              {data.main ? (
                <p>
                  <i className="fa-solid fa-location-dot"></i> {data.name}
                </p>
              ) : null}
            </p>
          </div>

          {/* Info Bottom */}

          {data.main ? (
            <div className="infoBottom">
              <div className="infoLeft">
                <p className="feelsLike">
                  {data.main ? (
                    <p>
                      <i className="fa-solid fa-temperature-half"></i>
                      {data.main.feels_like.toFixed()}° C <br />{" "}
                      <span className="textInfo">Feels like</span>
                    </p>
                  ) : null}
                </p>
              </div>
              <div className="infoRight">
                <p className="feelsLike">
                  {data.main ? (
                    <p>
                      <i className="fa-solid fa-droplet"></i>{" "}
                      {data.main.humidity.toFixed()}% <br />{" "}
                      <span className="textInfo">Humidity</span>
                    </p>
                  ) : null}
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
