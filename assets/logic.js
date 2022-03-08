let searchBtn = document.querySelector(".searchBtn")
let cityEntryEl = document.querySelector(".city-entry")
let searchHistoryEl = document.querySelector("#search-history")
let currentWeatherEl = document.querySelector("#current-weather")
let fiveDayForecastEl = document.querySelector("#five-day-forecast")

let weatherURL = "https://api.openweathermap.org/";
let APIKEY = "eb3ef0e0e63f51c08b0ca6554462ad8c"

let searchHistory = []

function renderCurrentWeather(city, weather, timezone) {

  let windspeed = weather.wind_speed
  let icon = weather.weather[0].icon
  let image = "http://openweathermap.org/img/w/" + icon + ".png";
  let tempF = weather.temp
  let date = weather.date
  let humidity = weather.humidity
  let UvIndex = weather.uvi

  let card = document.createElement("div");
  let cardCity = document.createElement("h2")
  let cardImg = document.createElement("img")
  let cardDate = document.createElement("h5")
  let cardTemp = document.createElement("p")
  let cardWind = document.createElement("p")
  let cardHumidity = document.createElement("p")
  let cardUvIndex = document.createElement("p")

  cardCity.textContent = city
  cardDate.textContent = moment().format("MM/DD/YYYY");
  cardTemp.textContent = "Current Temperature: " + tempF + " Degrees Farenheit"
  cardWind.textContent = "Current Windspeed: " + windspeed + " mph"
  cardHumidity.textContent = "Current Humidity: " + humidity + "%"
  cardUvIndex.textContent = "Current UV Index: " + UvIndex

  cardImg.setAttribute("src", image)

  card.append(cardCity, cardImg, cardDate, cardTemp, cardWind, cardHumidity, cardUvIndex)
  currentWeatherEl.append(card)
  
}

function renderForecast(forecast, timezone) {
  for (let i = 1; i < 6; i++) {
    const singleDay = forecast[i];

    let date = singleDay.dt
    let icon = singleDay.weather[0].icon
    let image = "http://openweathermap.org/img/w/" + icon + ".png";
    let tempF = singleDay.temp.day
    let wind = singleDay.wind_speed
    let humidity = singleDay.humidity

    
    let card = document.createElement("div");
    let cardImg = document.createElement("img")
    let cardDate = document.createElement("h5")
    let cardTemp = document.createElement("p")
    let cardWind = document.createElement("p")
    let cardHumidity = document.createElement("p")

    cardDate.textContent = moment.unix(date).format("MM/DD/YYYY");
    cardTemp.textContent = "Current Temperature: " + tempF + " Degrees Farenheit"
    cardWind.textContent = "Current Windspeed: " + wind + " mph"
    cardHumidity.textContent = "Current Humidity: " + humidity + " %"

    cardImg.setAttribute("src", image)

    card.append(cardImg, cardDate, cardTemp, cardWind, cardHumidity)
    fiveDayForecastEl.append(card)
  }
}

function initSearchHistory() {
  
  }
    
  ;
  // localstorage.getitem
  renderSearchHistory()

function appendHistory(search) {
  if (!searchHistory) {
    return
  }
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
  let searchedCities = JSON.parse(localStorage.getItem("cityList"))
  console.log(searchedCities)
  for (let i = 0; i < searchedCities.length; i++) {
    const pastCity = searchedCities[i];
    
    let cityBtn = document.createElement("button")
    cityBtn.textContent = pastCity
    searchHistoryEl.append(cityBtn)
  }
}

  // display search history list
  // for loop on array searchHistory[]
  // declare button and create element
  // declare attributes for forecast and buttonhistory
  // call data-search
  // create buutton
  // btn.setAttribute(data-search, searchHistory[i])
  // textcontent.append


function renderWeather(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

function fetchWeather(location) {
  let { lat, lon } = location
  let city = location.name
  let apiurl = `${weatherURL}data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKEY}`;
  
  fetch(apiurl)
    .then(function (response) {
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

function fetchCoords(search) {
  let url = `${weatherURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKEY}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location is not found.");
      } else {
        appendHistory(search)
        fetchWeather(data[0])
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
  fiveDayForecastEl.innerHTML = ''
  currentWeatherEl.innerHTML = ''
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







/* Style boxes
convert unix date time to regular date
current weather wants to show current date/dt
conditional logic for UVI for current weather, coloring if at certain values
save our previous searches to local storage and get local storage to make them into buttons



*/