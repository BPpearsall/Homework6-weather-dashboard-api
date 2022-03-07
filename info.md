Flow of functions - flow of code:
f inithistory

submit search button 
f handesearchformsubmit
f fetchcoords
f appendtohistory
f rendersearchhistory
f fetchweather
f renderitems
f rendercurrentweather
f renderforecast
f renderforecastcard

click search history button
f handlesearchhistoryclick
f fetchcoords
this will follow the path above

What each function should perform:

handleformsubmit:
    (fetchcoords is called out)
    validate an input and declare the value as a variable
    send to next code and clear the search input bar

fetchcoords:
    (fetchweather and appendtohistory is called out)
    fetches api
    within, various functions are called to complete and render weather information


 appendtohistory:
    (rendersearchhistory is called out)
        pushes searches into [] 
        sets the [] and any of its contents to localstorage

rendersearchhistory:
    displays the search list
    iterates thru the array to render the search history buttons

fetchweather:
    (renderitems is called out)
    city/location is defined by declaring properties of lat/lon
    fetch api using city/data from weather geolocation endpoint

renderitems:
    (rendercurrentweather and renderforecast are called out)
    passing thru in parameters to be used and redefined in functions called out -- in their parameters

rendercurrentwether:
    declare and define date thru js date library
    display the current weather data fetched from api
    create variables to store data from fetch req
    create card and display data

renderforecast:
    (renderforecastcard called out)
    displays 5 day forecast
    need to establish timestamps for start and end of 5 day forecast using js date library
    create a div and header as placeholder for the card
    iterate thru daily forecast data

renderforecastcard:
    displays a forecast card given an object from api daily forecast
    create variables for api data
    create card

inithistory:
    (rendersearchhistory is called out)
    get search history from local storage

handlesearchhistoryclick"
    (fetchcoords are called out)
    event handler for the buttons created for search history
    take button text to match value -- using "data attributes"