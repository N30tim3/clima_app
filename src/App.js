import React, { useState } from 'react';
import useLocalStorage from "./Utils/useLocalStorage.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

const [lang, setLang] = useLocalStorage("language", "sp, es");
const [query, setQuery] = useState('');
const [weather, setWeather] = useState({});

const search = evt => {
  if (evt.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=${lang}`)
      .then(res => res.json())
      .then(result => {
        setLang(result.sys.country);
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  }
}


const dateBuilder = (d) => {
  let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", 
  "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}


const SwitchImg = () => {
  if (
    typeof weather.main != 'undefined' &&
    weather.main.temp > 26 &&
    weather.weather[0].main !== 'Rain'
  ) {
    return 'app hot'
  }
  if (
    typeof weather.main != 'undefined' &&
    weather.main.temp > 16 &&
    weather.weather[0].main !== 'Rain'
  ) {
    return 'app warm'
  }
  if (
    typeof weather.main != 'undefined' &&
    weather.main.temp > 2 &&
    weather.weather[0].main !== 'Rain'
  ) {
    return 'app cold'
  }
  if (
    typeof weather.main != 'undefined' &&
    weather.main.temp < 2 &&
    weather.weather[0].main !== 'Rain'
  ) {
    return 'app snow'
  }

  if (
    typeof weather.main != 'undefined' &&
    weather.weather[0].main === 'Rain'
  ) {
    return 'app rain'
  } else {
  if (
    typeof weather.main != 'undefined' &&
    weather.weather[0].main === 'Clear Sky'
  ) {
    return 'app clearsky'
  } else {
  if (
      typeof weather.main != 'undefined' &&
      weather.weather[0].main === 'Few Clouds'
    ) {
      return 'app fewclouds'
    } else {
      if (
        typeof weather.main != 'undefined' &&
        weather.weather[0].main === 'Broken Clouds'
      ) {
        return 'app brokenclouds'
      } else {
        if (
          typeof weather.main != 'undefined' &&
          weather.weather[0].main === 'Mist'
        ) {
          return 'app mist'
        } else {
          if (
            typeof weather.main != 'undefined' &&
            weather.weather[0].main === 'Scattered Clouds'
          ) {
            return 'app scatteredclouds'
          } else {
            if (
              typeof weather.main != 'undefined' &&
              weather.weather[0].main === 'Shower Rain'
            ) {
              return 'app showerrain'
            } else {
              if (
                typeof weather.main != 'undefined' &&
                weather.weather[0].main === 'Thunderstorm'
              ) {
                return 'app thunderstorm'
              } else {
                return 'app'
              }
            }
          }
        }}}}
  }
}
  return (
    <div className={SwitchImg()}>
    <main>
      <div className="search-box">
      <input type="text" 
      className="search-bar" 
      placeholder="Buscar..."
      onChange={e => setQuery(e.target.value)}
      value={query}
      onKeyPress={search}
      />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}</div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
      </div> 
      ) : ('')}
      
    </main>
    <footer>
    <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
    </div>
    <ul className="social_icon">
        <li><a href="https://www.facebook.com/timecelebi/"><FontAwesomeIcon icon={faFacebook} /></a> </li>
        <li><a href="https://www.twitter.com/Yumenet"><FontAwesomeIcon icon={faTwitter} /></a></li>
        <li><a href="https://www.linkedin.com/in/n30tim3/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
        <li><a href="https://www.instagram.com/timecelebi/"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li><a href="https://api.whatsapp.com/send?phone=+525510961981"><FontAwesomeIcon icon={faWhatsapp} /></a></li>
        
    </ul>
    <ul className="menu">
        <li><a href="#">Jose Alberto Hernandez Guzman</a></li>
        <li><a href="#">CDMX</a></li>
        <li><a href="mailto:contactoitph@gmail.com">Contacto</a></li>
    </ul>
    <p>2022 Todos Los Derechos Reservados - N30tim3</p>
</footer>
    </div>
  );
}

export default App;
