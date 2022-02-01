let searchareaEl = document.getElementById("searcharea");
let inputcityEl = document.getElementById("inputcity");
let buttonsearchEl = document.getElementById("searchbutton");
let todayforecastEl = document.getElementById("todayforecast");
let futureforecastEl = document.getElementById("futureforecast");
let historyEl = document.getElementById("history");

let temp1El = document.getElementById("temp1");
let wind1El = document.getElementById("wind1");
let humidity1El = document.getElementById("humidity1");
let temp2El = document.getElementById("temp2");
let wind2El = document.getElementById("wind2");
let humidity2El = document.getElementById("humidity2");
let temp3El = document.getElementById("temp3");
let wind3El = document.getElementById("wind3");
let humidity3El = document.getElementById("humidity3");
let temp4El = document.getElementById("temp4");
let wind4El = document.getElementById("wind4");
let humidity4El = document.getElementById("humidity4");
let temp5El = document.getElementById("temp5");
let wind5El = document.getElementById("wind5");
let humidity5El = document.getElementById("humidity5");

let date1El = document.getElementById("date1");
let date2El = document.getElementById("date2");
let date3El = document.getElementById("date3");
let date4El = document.getElementById("date4");
let date5El = document.getElementById("date5");

let day1El = document.getElementById("1");
let day2El = document.getElementById("2");
let day3El = document.getElementById("3");
let day4El = document.getElementById("4");
let day5El = document.getElementById("5");

let cityEl = document.createElement("h2");
let temperatureEl = document.createElement('p');
let windEl = document.createElement('p');
let humidityEl = document.createElement('p');
let uviEl = document.createElement('p');
let todayforecastIcon = document.createElement("img");
let day1Icon = document.createElement("img");
let day2Icon = document.createElement("img");
let day3Icon = document.createElement("img");
let day4Icon = document.createElement("img");
let day5Icon = document.createElement("img");

todayforecastEl.appendChild(cityEl);
todayforecastEl.appendChild(temperatureEl);
todayforecastEl.appendChild(windEl);
todayforecastEl.appendChild(humidityEl);
todayforecastEl.appendChild(uviEl);
todayforecastEl.appendChild(todayforecastIcon);
day1El.appendChild(day1Icon);
day2El.appendChild(day2Icon);
day3El.appendChild(day3Icon);
day4El.appendChild(day4Icon);
day5El.appendChild(day5Icon);

let history = [];

let key  = "588e55b45729a10914d329a5994b96de";

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    let inputcity = inputcityEl.value;
    if (!inputcity) {
      window.alert('Please enter a City!');
      return;
    }
    
    createcitylistelement(inputcity);
    savetostorage(inputcity);
}  

function createcitylistelement (city) {
    let buttoncityEl = document.createElement("button");
    buttoncityEl.textContent = city;
    historyEl.appendChild(buttoncityEl);

    getlatandlon(city);
}

function handleHistoryFormSubmit(event) {
    event.preventDefault();
  
    let inputcity = event.target.textContent;
    console.log(inputcity);

    getlatandlon(inputcity);

}  

function getlatandlon (city) {
    console.log("getting lat and lon");

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

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
        let code = data.weather[0].icon;
        console.log(code);
        console.log(lat);
        console.log(lon);

        todayforecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + code + "@2x.png");
        todayforecastIcon.setAttribute("alt", data.weather[0].description);

        cityEl.textContent = data.name + " " + moment().format("MM/DD/YYYY");

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

        let day1 = data.daily[1];
        let day2 = data.daily[2];
        let day3 = data.daily[3];
        let day4 = data.daily[4];
        let day5 = data.daily[5];

        displayforecastpresent (temperature,wind,humidity,uvi);
        displayforecastfuture (day1,day2,day3,day4,day5);
    })
}

function displayforecastpresent (temperature,wind,humidity,uvi) {
    temperatureEl.textContent = "Temperature: " + temperature + " °C";
    windEl.textContent = "Wind: " + wind + " m/s";
    humidityEl.textContent = "Humidity: " + humidity + " %";
    uviEl.textContent = "UV Index: " + uvi;

    if (uvi <=2) {
        uviEl.setAttribute("class","bg-green");

    }
    else if (uvi <= 5) {
        uviEl.setAttribute("class","bg-yellow");
    }
    else if (uvi <= 7) {
        uviEl.setAttribute("class","bg-oragne");
    }
    else if (uvi <=10) {
        uviEl.setAttribute("class","bg-red");
    } 
    else {
        uviEl.setAttribute("class","bg-grey");
    }
}

function displayforecastfuture (day1,day2,day3,day4,day5) {
    date1El.textContent = moment.unix(day1.dt).format("MM/DD/YYYY");
    temp1El.textContent = "Temp: " + day1.temp.day + " °C";
    wind1El.textContent = "Wind: " + day1.wind_speed + " m/s";
    humidity1El.textContent = "Humidity: " + day1.humidity;
    day1Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + day1.weather[0].icon + "@2x.png");
    day1Icon.setAttribute("alt", day1.weather[0].description);

    date2El.textContent = moment.unix(day2.dt).format("MM/DD/YYYY");
    temp2El.textContent = "Temp: " + day2.temp.day + " °C";
    wind2El.textContent = "Wind: " + day2.wind_speed + " m/s";
    humidity2El.textContent = "Humidity: " + day2.humidity;
    day2Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + day2.weather[0].icon + "@2x.png");
    day2Icon.setAttribute("alt", day2.weather[0].description);

    date3El.textContent = moment.unix(day3.dt).format("MM/DD/YYYY");
    temp3El.textContent = "Temp: " + day3.temp.day + " °C";
    wind3El.textContent = "Wind: " + day3.wind_speed + " m/s";
    humidity3El.textContent = "Humidity: " + day3.humidity;
    day3Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + day3.weather[0].icon + "@2x.png");
    day3Icon.setAttribute("alt", day3.weather[0].description);

    date4El.textContent = moment.unix(day4.dt).format("MM/DD/YYYY");
    temp4El.textContent = "Temp: " + day4.temp.day + " °C";
    wind4El.textContent = "Wind: " + day4.wind_speed + " m/s";
    humidity4El.textContent = "Humidity: " + day4.humidity;
    day4Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + day4.weather[0].icon + "@2x.png");
    day4Icon.setAttribute("alt", day4.weather[0].description);

    date5El.textContent = moment.unix(day5.dt).format("MM/DD/YYYY");
    temp5El.textContent = "Temp: " + day5.temp.day + " °C";
    wind5El.textContent = "Wind: " + day5.wind_speed + " m/s";
    humidity5El.textContent = "Humidity: " + day5.humidity;
    day5Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + day5.weather[0].icon + "@2x.png");
    day5Icon.setAttribute("alt", day5.weather[0].description);

}

function savetostorage (inputcity) {
    history.push(inputcity);
    localStorage.setItem("searchhistory", JSON.stringify(history));
}

function renderbuttons () {
    for (var i = 0; i < history.length; i++) {
        var historyelement = history[i];
    
        var button = document.createElement("button");
        button.textContent = historyelement;

        historyEl.appendChild(button);
      }
}

function init() {
    var storedhistory = JSON.parse(localStorage.getItem("searchhistory"));
    
    if (storedhistory !== null) {
      history = storedhistory;
    }
   
    renderbuttons();
    
    console.log("history loaded");
  }

buttonsearchEl.addEventListener("click", handleSearchFormSubmit);
historyEl.addEventListener("click", handleHistoryFormSubmit);

init();