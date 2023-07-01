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

function search(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityinput.value;

  let apikey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let city = cityinput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&units=metric`;

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
  }

  axios.get(`${apiURL}&appid=${apikey}`).then(showWeather);
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
