// Defined global doms 
let searchBtn = document.querySelector(".searchBtn")
let cityEntryEl = document.querySelector(".city-entry")
let searchHistoryEl = document.querySelector("#search-history")
let currentWeatherEl = document.querySelector("#current-weather")
let fiveDayForecastEl = document.querySelector("#five-day-forecast")

// OpenWeather api information
let weatherURL = "https://api.openweathermap.org/";
let APIKEY = "eb3ef0e0e63f51c08b0ca6554462ad8c"

// Sets empty array for searchHistoryt to be filled
let searchHistory = JSON.parse(localStorage.getItem('cityList')) || [];

// Creates card and calls api information for current day
function renderCurrentWeather(city, weather) {

  let windspeed = weather.wind_speed
  let icon = weather.weather[0].icon
  let image = "http://openweathermap.org/img/w/" + icon + ".png";
  let tempF = weather.temp
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
  // If Statements for adding colors to UV index
  if (UvIndex < 2) {
    cardUvIndex.classList.add("uv-low")
  } if (UvIndex > 2 && UvIndex < 4) {
    cardUvIndex.classList.add("uv-med")
  } if (UvIndex > 4) {
    cardUvIndex.classList.add("uv-high")
  }
  
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

// Function to render the 5 day forecast
function renderForecast(forecast) {
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

    // moment.unix converts api data in unix to mm/dd/yyyy format
    cardDate.textContent = moment.unix(date).format("MM/DD/YYYY");
    cardTemp.textContent = "Temperature: " + tempF + "Deg"
    cardWind.textContent = "Windspeed: " + wind + " mph"
    cardHumidity.textContent = "Humidity: " + humidity + "%"

    cardImg.setAttribute("src", image)

    card.append(cardImg, cardDate, cardTemp, cardWind, cardHumidity)
    fiveDayForecastEl.append(card)
  }
}
// getting local storage and appending buttons to searchhistory dom
function initSearchHistory() {
  let searchedCities =   JSON.parse(localStorage.getItem("cityList")) ? JSON.parse(localStorage.getItem("cityList")) : []
  console.log(searchedCities)
  searchHistoryEl.innerHMTL = '';
  for (let i = 0; i < searchedCities.length; i++) {
    
    const pastCity = searchedCities[i];
    
    let cityBtn = document.createElement("button")
    cityBtn.classList.add("btn-history")
    cityBtn.textContent = pastCity
    searchHistoryEl.append(cityBtn)
  }
  
  }

// Setting local storage based off searched cities
function appendHistory(search) {
  if (!searchHistory) {
    return
  }
  searchHistory.push(search)
  localStorage.setItem("cityList", JSON.stringify(searchHistory))
  console.log(searchHistory)
  initSearchHistory()
}

// sending fetchWeather information to currentweather and 5 day forecast function
function renderWeather(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

// uses the city name gotten through fetchCoords to get the Lat and Lon of the city and then uses that to get relevant API data
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

// searches weather API for the city selected in search text field
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
    fiveDayForecastEl.innerHTML = ''
    currentWeatherEl.innerHTML = ''
    searchHistoryEl.innerHTML = ''
}

// checks if text box is empty and sends cityEntryEl value to fetchCoords function, clears page to avoid duplicate information
function searchCity(event) {
  event.preventDefault()
  if (!cityEntryEl.value) {
    return;
  }
  let search = cityEntryEl.value.trim();
  console.log(cityEntryEl)
  fetchCoords(search);
  cityEntryEl.value = '';
  fiveDayForecastEl.innerHTML = ''
  currentWeatherEl.innerHTML = ''
  searchHistoryEl.innerHTML = ''
}

// Allows the buttons on searchhistory to be clicked to that you can look at previous cities quickly
function searchWeatherHistory(event) {
  event.preventDefault()
  if (!event.target.matches(".btn-history")) {
    return;
  }
  let btn = event.target;
  let search = btn.textContent;
  fetchCoords(search)
}

// loads previous buttons from local storage
initSearchHistory()

searchBtn.addEventListener("click", searchCity)



searchHistoryEl.addEventListener("click", searchWeatherHistory)






