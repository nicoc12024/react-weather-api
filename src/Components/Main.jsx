import React, { useState } from "react";
import "../stylesheets/Main.css";
import axios from "axios";
import moment from "moment";

function Main() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [icon, setIcon] = useState("");

  const apiKey = "f1e7121e219070f4e629e794f41df9b7";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (e) => {
    e.preventDefault();

    axios
      .get(url)
      .then((response) => {
        const imgSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        const dayDOM = moment().format("dddd");
        const monthDOM = moment().format("LL");
        setMonth(monthDOM);
        setDay(dayDOM);

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
      <form className="form" onSubmit={searchLocation}>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Search for location"
          required
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <button type="submit">SEARCH</button>
      </form>
      <div className="card">
        <div className="infoTop">
          <p className="day">{day}</p>
          <p className="date">{month}</p>
          <p className="location">{data.name}</p>
        </div>
        <div className="infoBottom">
          <div> {data.main ? <p>{data.main.temp.toFixed()} C</p> : null}</div>
          <p className="weather"> {data.weather ? data.weather[0].main : null}</p>
          {icon ? <img src={icon} alt="icon" /> : null}
        </div>
      </div>
    </div>
  );
}
export default Main;
