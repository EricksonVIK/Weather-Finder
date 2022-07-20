// create variables for dom's
var userFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var submitBtn = document.querySelector("#btn");
var city = cityInputEl.value.trim();
// var cityUpper=city.toUpperCase();
var stateInputEl = document.querySelector("#state");
var state = stateInputEl.value.trim();
var historyList = document.querySelector("#searchlist");
var currentDayBlock = document.querySelector("#current");
var fiveDayBlock = document.querySelector("#fiveDay");
var currentTemp=document.querySelector("#temp");
var currentimage=document.querySelector("#image");
var cityName=document.querySelector("#cityName");
var currentWind=document.querySelector("#wind");
var currentUvi=document.querySelector("#uvi");
var iconHolder=document.querySelector("#icon");
var iconC=document.querySelector("#wicon")


// form submit function
var submitCS = function(event){
    // prevent page from refreshing
    event.preventDefault();
    savedHistory();
    displayHistory();
    // get value from input
    // console.log(event) - worked
    var city = cityInputEl.value.trim();
    var state = stateInputEl.value.trim();

    if (city, state){
        getLatLonInfo(city, state)
        cityInputEl.value = "";
        stateInputEl.value = "";
    }else{
        alert("Please enter valid city and state.");
    };
};


// Arrays
var lat =[];
var lon = [];
var weatherArrCurr=[];
// var fiveDayW = [];
// possible split
var fiveDayArr=[];
var cityNameC=[];
var tempC=[];
var windC=[];
var uviC=[];
var imageC=[];
var feelsLikeC=[];

// fetch functions
// may try to add everything into 1 function
var getLatLonInfo = function (city, state){
    console.log("called");
    // format weather api
    // geo code to get long and lat
    // http://api.openweathermap.org/geo/1.0/direct?q=durham,nc,USA&limit=1&appid=0714ff4099a70754b88ad38fab16cccd
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",USA&limit=1&appid=0714ff4099a70754b88ad38fab16cccd"
    fetch(geoUrl)
        .then(function(response){
            if (response.ok){
                // console.log(response);worked
                response.json().then(function(data){
                    console.log("this is latlon") 
                    console.log(data);
                   var latr = data[0].lat;
                   var lonr = data[0].lon;
                   lat.push(latr)
                   lon.push(lonr)
                   var city=(data[0].name)
                   cityNameC.push(city)
                   getWeatherInfo(latr, lonr);
                });
            } else {
                alert("City Not Found");
            };
            
        });
}
// function test(){
//     getWeatherInfo();
// }
function getWeatherInfo (lat, lon){
    console.log(lat, lon);
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=0714ff4099a70754b88ad38fab16cccd&units=imperial"
    fetch (apiUrl)
    .then(function (response){
        if (response.ok){
            // console.log(response);worked
            response.json().then(function(data){
                console.log("This is getWeather data")
                console.log(data);
                var currentWeather= (data.current)
                console.log("this is current weather")
                console.log(currentWeather)
                weatherArrCurr.push(currentWeather);
                var fiveDayWeather= (data.daily);
                console.log("this is daily");
                console.log(fiveDayWeather);
                fiveDayArr.push(fiveDayWeather);
                var temp=(data.current.temp)
                console.log(temp)
                tempC.push(temp);
                var image=(data.current.weather.icon)
                imageC.push(image);
                var wind=(data.current.wind_speed);
                windC.push(wind);
                var uvi=(data.current.uvi);
                uviC.push(uvi);
                var feelsLike = (data.current.feels_like);
                feelsLikeC.push(feelsLike)
                console.log(data.current.weather[0].icon)
                // var weatherIconC=(data.current.weather.icon);
                // weatherIconCurr.push(weatherIconC);
                // http://openweathermap.org/img/w/10d.png
                // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
            })
        } else {
            alert("Error, unable to connect");
        };
    })
    currentDay();
    fiveDay();
}

// display current day
function currentDay (){
    // catching a no info error
    // currentDayBlock.innerHTML="";
    if (weatherArrCurr.length === -1){
        alert("No information available!")
    }
    // only displays the first name searched!!! Bc it's in the latlon function
    cityName.innerHTML=cityNameC[0];
    currentTemp.innerHTML= tempC[0] + "&#176 " + "feels like " + feelsLikeC[0];
    currentWind.innerHTML= "Wind Speed " + windC[0];
    currentUvi.innerHTML=uviC[0];

    var iconText = weatherArrCurr[0].weather[0].icon;

    // iconC.src="http://openweathermap.org/img/w/" + iconText + ".png";
    // template literal
    iconC.setAttribute("src", `http://openweathermap.org/img/w/${iconText}.png`)

}

function fiveDay (){
    var dayBlock = document.createElement("div");
    dayBlock.setAttribute("id", "dayDiv");
    dayBlock.classList="list-item flex-row justify-space-between align-center"
    console.log("this is dayBlock");
    console.log(dayBlock);
    // for loop or for each?
    // var daily = fiveDayArr
    // 5 for the number of loops  --- i representes index
    for (var i=0; i < 5; i++){
        fiveDayBlock.appendChild(dayBlock);
        dayBlock.textContent=(fiveDayArr[i].clouds);
    };
};

// account for errors
var displayHistory= function (){
    var searchHistory = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML="";
    searchHistory.forEach(function(history) {
        var historyEl = document.createElement("a");
        // historyEl.innerHTML = history;
        historyEl.classList="list-item flex-row justify-space-between align-center"
        // set an attribute to click and resend - Does that need to be another function?
        historyEl.setAttribute("target", "_blank");   
        historyList.appendChild(historyEl);
        var savedCityText = document.createElement("span");
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
            // state: stateInputEl.value.trim(),
        );

    }

    localStorage.setItem("history", JSON.stringify(cityHistory));
};

// displays local on start up
displayHistory();

// starts the chain of events to display weather info
userFormEl.addEventListener("submit", submitCS);


// inside click function - 
// fetch (apidummy)
// .then (function(response){
    // var lat  and var lon
    // fetch (2nd api)
    // .then (function(data){
    // all of the stuff to display
    // })
// })

// this research