let searchBtn = document.querySelector(".searchBtn")
let cityEntryEl = document.querySelector(".city-entry")
let searchHistoryEl = document.querySelector("#search-history")
let weatherURL = "https://api.openweathermap.org/";
let APIKEY = "eb3ef0e0e63f51c08b0ca6554462ad8c"

let searchHistory = []

function renderCurrentWeather(city, weather, timezone) {
  // store response data when created variables
  let tempF = weather.temp
}

function renderForecastCard(forecast, timezone) {
  // display forecast card. 
  // create card for 5 days of forecast
  // define variables from api
  // look at bootstrap and hardcode one card wrapped into a div
}

function renderForecast(dailyforecast, timezone) {
  // for loop for the 5 day forecast
  renderForecastCard()
}

function initSearchHistory() {
  // localstorage.getitem
  renderSearchHistory()
}

function appendHistory(search) {
  searchHistory.push(search)
  localStorage.setItem("cityList", JSON.stringify(searchHistory))
  console.log(searchHistory)
  // sets localstorage, updates displayed history
  // if there is no search, return function
  // searchhistory[] needs to be globally declards
  // searchHistory.push(search)
  renderSearchHistory()
}

function renderSearchHistory() {
  // display search history list
  // for loop on array searchHistory[]
  // declare button and create element
  // declare attributes for forecast and buttonhistory
  // call data-search
  // create buutton
  // btn.setAttribute(data-search, searchHistory[i])
  // textcontent.append
}

function renderWeather(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

// This will pull location led by Lat and Lon for geo location
function fetchWeather(location) {
  let { lat, lon } = location
  console.log(lat)
  console.log(lon)
  let city = location.name
  console.log(city)
  console.log(location)
  let apiurl = `${weatherURL}data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKEY}`;
  
  fetch(apiurl)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(city, data)
      renderWeather(city, data)

    })
    .catch(function (err) {
      console.error(err);
    });

}

// Call out for the current weather and 5 day forecast weather
function fetchCoords(search) {
  // call API for query of limit
  let url = `${weatherURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKEY}`;
  fetch(url)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location is not found.");
      } else {
        appendHistory(search)
        fetchWeather(data[0])
        console.log(search)
        console.log(data[0])
      }


    })
    .catch(function (err) {
      console.error(err);
    });

}

function searchCity(event) {
  if (!cityEntryEl.value) {
    return;
  }
  event.preventDefault()
  let search = cityEntryEl.value.trim();
  console.log(cityEntryEl)
  fetchCoords(search);
  cityEntryEl.value = '';
}

function searchWeatherHistory(event) {
  event.preventDefault()
  if (!event.target.matches(".btn-history")) {
    return;
  }
  let btn = event.target;
  let search = btn.getAttribute("data-search");
  fetchCoords(search)
}

initSearchHistory();

searchBtn.addEventListener("click", searchCity)


searchHistoryEl.addEventListener("click", searchWeatherHistory)