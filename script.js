// write function to fetch data from api
// write function to populate information into respective areas
// write function to make a button under the search area to recall fetch and populate

let searchareaEl = document.getElementById("searcharea");
let inputcityEl = document.getElementById("inputcity");
let buttonEl = document.getElementById("searchbutton");
let todayforecastEl = document.getElementById("todayforecast");
let futureforecastEl = document.getElementById("futureforecast");

let cityEl = document.createElement("h1");
let temperatureEl = document.createElement('p');
let windEl = document.createElement('p');
let humidityEl = document.createElement('p');
let uviEl = document.createElement('p');
let fivedayheaderEl = document.createElement('h1');

todayforecastEl.appendChild(cityEl);
todayforecastEl.appendChild(temperatureEl);
todayforecastEl.appendChild(windEl);
todayforecastEl.appendChild(humidityEl);
todayforecastEl.appendChild(uviEl);
futureforecastEl.appendChild(fivedayheaderEl);



let key  = "588e55b45729a10914d329a5994b96de";

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    let inputcity = inputcityEl.value;
    if (!inputcity) {
      window.alert('Please enter a City!');
      return;
    }
    
    getlatandlon(inputcity);

}  

function getlatandlon (city) {
    console.log("getting lat and lon");

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + key;

    fetch(url)
    .then (function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        console.log(lat);
        console.log(lon);

        cityEl.textContent = data.name;
        console.log(cityEl);
        getforecast(lat,lon);
        
    })    
}

function getforecast (lat,lon) {
    console.log('getting forecast')

    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly,alerts&appid=" + key;
   
    fetch(url)
    .then(function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        let temperature = data.current.temp;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let uvi = data.current.uvi

        console.log(temperature);
        console.log(wind);
        console.log(humidity);
        console.log(uvi);

        let day1 = data.daily[0];
        let day2 = data.daily[1];
        let day3 = data.daily[2];
        let day4 = data.daily[3];
        let day5 = data.daily[4];

        displayforecastpresent (temperature,wind,humidity,uvi);
        displayforecastfuture (day1,day2,day3,day4,day5);
    })
}

function displayforecastpresent (temperature,wind,humidity,uvi) {
    temperatureEl.textContent = "Temperature: " + temperature + " °C";
    windEl.textContent = "Wind: " + wind + " KPH";
    humidityEl.textContent = "Humidity: " + humidity + " %";
    uviEl.textContent = "UV Index: " + uvi;
}

function displayforecastfuture (day1,day2,day3,day4,day5) {
    fivedayheaderEl.textContent = "5-Day Forecast";

}


buttonEl.addEventListener("click", handleSearchFormSubmit);