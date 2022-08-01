// create variables 
// api key for fetch
const apiKey ="0714ff4099a70754b88ad38fab16cccd";

// Dom variables
var userFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var submitBtn = document.querySelector("#btn");
var city = cityInputEl.value.trim();
var historyList = document.querySelector("#searchlist");
var currentDayBlock = document.querySelector("#current");
var fiveDayBlock = document.querySelector("#fiveDay");
var currentTemp=document.querySelector("#temp");
var currentimage=document.querySelector("#image");
var cityName=document.querySelector("#cityName");
var currentWind=document.querySelector("#wind");
var currentUvi=document.querySelector("#uvi");
var iconHolder=document.querySelector("#icon");
var currentHumid=document.querySelector("#humidity")


// form submit function
var submitCS = function(event){
    // prevent page from refreshing
    event.preventDefault();

    savedHistory();
    displayHistory();
    // get value from input
    var city = cityInputEl.value.trim();
    getWeather(city);
    // var geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial` ;
};

function getWeather (city){
    var geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial` ;

    fetch(geoUrl)
  .then( function( response){

     if( response.status === 200){
        return response.json();
     } else{
        return Promise.reject ( new Error(response.statusText))
     }
  }).then( function( data){
     var lon = data.coord.lon;
     var lat = data.coord.lat;

     return fetch( `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`);

  }).then( function(response) {
        if( response.status ===200){
            return response.json();
        }else{

            return Promise.reject( new Error ( response.statusText))
        }

  }). then( function(data){
    console.log(data.current)
    console.log(data.daily)
    const currentWeather = data.current;
    const forecastWeather = data.daily;
    // console.log (currentWeather)
    // console.log (forecastWeather)
    displaycurrentDay(currentWeather);
    displayFiveDay(forecastWeather);

  })
  if (city){
    cityInputEl.value="";
  } else {
    alert('Please enter valid city!')
  }
};

// display current day (not displaying name)
function displaycurrentDay (currentWeather) {
    // catching a no info error
    console.log('hit')
    console.log(currentWeather)
    if (current.length === -1){
        alert("No information available!")
    }
    // cityName.innerHTML=cityInputEl.value.trim() + date;
    var date = new Date (0);
    date.setUTCSeconds(currentWeather.dt)
    date = date.toLocaleDateString("en-US");
    console.log("today's date" + date)
    cityName.innerHTML=cityInputEl.value.trim() + date
    var iconDisplay = document.createElement("img")
    iconDisplay.classList = "icon"
    iconDisplay.src = "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png"
    iconHolder.appendChild(iconDisplay);
    currentTemp.innerHTML= "Temp: " + currentWeather.temp + "&#176 " + "feels like " + currentWeather.feels_like + "&#176 ";
    currentHumid.innerHTML = "Humidity: " + currentWeather.humidity + "%";
    currentWind.innerHTML= "Wind Speed: " + currentWeather.wind_speed + " mph";
    currentUvi.innerHTML= "UV Index: " + currentWeather.uvi;
    
}

function displayFiveDay (forecastWeather){
    console.log('hit forecast');
    console.log(forecastWeather)
  

    for (var i=1; i < 6; i++){        
        // create parent Div and Append
        var dayBlock = document.createElement("div");
        dayBlock.setAttribute("id", "dayDiv");
        dayBlock.classList="flex-column dayDiv"
        fiveDayBlock.appendChild(dayBlock);

        // create date and icon div and appent
        var dateIconEl = document.createElement("div")
        dateIconEl.classList="flex-row justify-space-between"
        dayBlock.appendChild(dateIconEl)

        // create element for date
        var forecastDate= document.createElement('h4');
        var dateNew = new Date (0);
        dateNew.setUTCSeconds(forecastWeather[i].dt)
        dateNew = dateNew.toLocaleDateString("en-US");
        forecastDate.innerHTML=dateNew
        console.log("this is the date" + dateNew)
        dateIconEl.appendChild(forecastDate)

        // create element for icon
        var forecastIcon = document.createElement('img')
        forecastIcon.src= `http://openweathermap.org/img/wn/${forecastWeather[i].weather[0].icon}.png`
        forecastIcon.innerHTML=forecastWeather[i].weather[0].icon
        console.log(forecastIcon)
        dateIconEl.appendChild(forecastIcon);

        // create element for temp
        var forecastTemp = document.createElement('p')
        forecastTemp.innerHTML="Temp: " + forecastWeather[i].temp.day + "&#176 "
        dayBlock.appendChild(forecastTemp)

        // create element for wind
        var forecastWind = document.createElement('p')
        forecastWind.innerHTML="Wind Speed: " + forecastWeather[i].wind_speed + "mph"
        dayBlock.appendChild(forecastWind);

        // create element for humidity
        var forecastHumidity = document.createElement ('p')
        forecastHumidity.innerHTML="Humidity %: " + forecastWeather[i].humidity + "%"
        dayBlock.appendChild(forecastHumidity)

        // create element for uv
        var forecastUv = document.createElement('p')
        forecastUv.innerHTML="UV Index: " + forecastWeather[i].uvi
        dayBlock.appendChild(forecastUv)
        
    };
};

// /
var displayHistory= function (){
    var searchHistory = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML="";
    searchHistory.forEach(function(history) {
        var historyEl = document.createElement("span");
        historyEl.classList="previousBtn justify-space-between align-center"
        historyEl.setAttribute("type", "submit");   
        historyList.appendChild(historyEl);
        var savedCityText = document.createElement("button");
        savedCityText.textContent=history;
        savedCityText.classList= "history";
        historyEl.appendChild(savedCityText);
        
    });
}
// saves city history to display under button (state not included)
var savedHistory = function(){
    var cityHistory = JSON.parse (localStorage.getItem('history')) || [];

    var city = cityInputEl.value.trim();

    if (cityHistory.indexOf(city) === -1){


            cityHistory.push(
            city
        );

    }

    localStorage.setItem("history", JSON.stringify(cityHistory));
};

// displays local on start up
displayHistory();

// starts the chain of events to display weather info
userFormEl.addEventListener("submit", submitCS);

// function to retrieve history 
document.addEventListener("click", event => {
    if (event.target.classList.contains('history')){
        console.log(event.target.textContent)
        getWeather(event.target.textContent)
    }
})

