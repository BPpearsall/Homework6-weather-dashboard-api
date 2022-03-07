let searchBtn = document.querySelector(".searchBtn")
let cityEntryEl = document.querySelector(".city-entry")
let searchHistoryEl = document.querySelector("#search-history")
let weatherURL = "https://api.openweathermap.org/";
let APIKEY = "eb3ef0e0e63f51c08b0ca6554462ad8c"

let searchHistory = []

function handleFormSubmit(event) {
    if (!cityEntryEl.value) {
        return;
    }
    event.preventDefault()
    let search = cityEntryEl.value.trim();
    console.log(search)
    fetchCoords(search);
    cityEntryEl.value = '';
}

function fetchCoords(search) {
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
                appendToHistory(search)
                fetchWeather(data[0])
                console.log(search)
                console.log(data[0])
            }


        })
        .catch(function (err) {
            console.error(err);
        });
}

// function appendToHistory(){

// }

// function renderSearchHistory(params) {

// }

function fetchWeather(location) {
    let { lat, lon } = location
    console.log(lat)
    console.log(lon)
    let city = location.name
    console.log(city)
    console.log(location)
    let apiurl = `${weatherURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKEY}`;
    fetch(apiurl)
      .then(function (response) {
        console.log(response)
        return response.JSON();
      })
      .then(function (data) {
        console.log(city, data)
        renderWeather(city, data)
  
      })
      .catch(function (err) {
        console.error(err);
      });
}

function renderItems(city, data) {
    renderCurrentWeather(city, data.current, data.timezone);
    renderForecast(data.daily, data.timezone);
}

// function renderCurrentWeather(params) {

// }

// function renderForecast(params) {

// }

// function renderForecastCard(params) {

// }

// function initHistory(params) {

// }

// function handleSearchHistoryClick(params) {

// }


// initSearchHistory();

searchBtn.addEventListener("click", handleFormSubmit)



// searchHistoryEl.addEventListener("click", handleSearchHistoryClick)