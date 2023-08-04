import React, { useState } from "react";
import "./home.css";
import windpic from "./images/storm.png";
import clearpic from "./images/clear-sky.png";
import humiditypic from "./images/humidity.png";
import cloudpic from "./images/cloud.png";
import searchpic from "./images/search.png";
import mistpic from "./images/haze.png";
import rainpic from "./images/rain.png";
import snowpic from "./images/snow.png";

import axios from "axios";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: `Delhi`,
    humidity: 20,
    Speed: 20,
    image: cloudpic,
  });
  const [name, setName] = useState(``);
  const [error, setError] = useState(``);

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a2d611690a4c930fcffe3c8715fe116e&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagepath = ``;
          if (res.data.weather[0].main === "Clouds") {
            imagepath = cloudpic;
          } else if (res.data.weather[0].main === "Rain") {
            imagepath = rainpic;
          } else if (res.data.weather[0].main === "Snow") {
            imagepath = snowpic;
          } else if (res.data.weather[0].main === "Mist") {
            imagepath = mistpic;
          } else {
            imagepath = clearpic;
          }

          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            Speed: res.data.wind.speed,
            image: imagepath,
          });
          setError(``);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError(``);
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City name "
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src={searchpic} onClick={handleClick} alt=""></img>
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="cloud" className="icon" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humiditypic} alt="humidity" />
              <div className="humidity">
                <p>Humidity</p>
                <p>{Math.round(data.humidity)}%</p>
              </div>
            </div>
            <div className="col">
              <img src={windpic} alt="Wind" />
              <div className="wind">
                <p>Wind</p>
                <p>{Math.round(data.Speed)}Km/h</p>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
