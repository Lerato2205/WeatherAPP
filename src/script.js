function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let now = new Date();
  let day = now.getDay();
  let month = now.getMonth();
  let dateNumber = now.getDate();
  let year = now.getFullYear();

  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return ` ${weekDay[day]} ${hours}:${minutes} `;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayforecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecast.forEach(function (forecastday) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecase-date">
              ${formatDay(forecastday.dt * 1000)}
              </div>
              <img src="http://openweathermap.org/img/wn/${
                forecastday.weather[0].icon
              }@2x.png" alt="" width="36" />
              <div class="weather-forecast-temps">
              <span class="weather-forecast-temp-max">${
                forecastday.temp.max
              }°</span>
              <span class="weather-forecast-temp-min">${
                forecastday.temp.min
              }°</span>
              </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  console.log(coordinates);
  let apikey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;

  axios.get(apiURL).then(displayforecast);
}

function search(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityinput.value;

  let apikey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&units=metric`;
  axios.get(`${apiURL}&appid=${apikey}`).then(showWeather);
}
function showWeather(response) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let Desc = document.querySelector("#weather-description");
  Desc.innerHTML = response.data.weather[0].description;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  getforecast(response.data.coord);

  console.log(response.data);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showLocation(location) {}
navigator.geolocation.getCurrentPosition(showLocation);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
