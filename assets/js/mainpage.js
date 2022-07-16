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
var cityName=document.querySelector("#cityName")
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
// possible split
var fiveDayArr=[];
var tempC=[];
var imageC=[];
// fetch functions
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
                   var latr = (data[0].lat);
                   var lonr = (data [0].lon);
                //    console.log(latr);
                //    console.log(lonr);
                   lat.push(latr)
                   lon.push(lonr)
                //    console.log(latr);
                //    console.log(lat);
                   getWeatherInfo(latr, lonr);
                });
            } else {
                alert("City Not Found");
            };
            
        });
}

var getWeatherInfo = function (lat, lon){
    console.log("this has been called");
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
                var image=(data.weather)
                imageC.push(image);

            })
        } else {
            alert("Error, unable to connect");
        };
    })
    currentDay();
    fiveDay();
}

// display current day
var currentDay = function (){
    // catching a no info error
    // currentDayBlock.innerHTML="";
    if (weatherArrCurr.length === -1){
        alert("No information available!")
    }
    // change to city upper?
    cityName.innerHTML=cityInputEl.value.trim();
    currentTemp.innerHTML=tempC[0]
    // currentimage.innerHTML=imageC[0]

    // current weather displayed
    // currentDayBlock to append
    // var cityName = document.createElement("div")
    // cityNameArr=(weatherArrCurr[0].clouds);
    // above is undefined, but console.log(weatherArrCurr[0].clouds will display in tools)
    // do i need to convert the object into an array? if so, research how
    // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
    // cityName.innerHTML=cityNameArr;
    // console.log("this is weatherArrCurr")
    // console.log(weatherArrCurr)
    // console.log("this is cityNameArr")
    // console.log(cityNameArr)
    // currentDayBlock.appendChild(cityName);
    // currentDayBlock.innerHTML=weatherArrCurr[0]
}

var fiveDay = function(){
    // fiveDayBlock.innerHTML="";
    var daily = fiveDayArr
    for (var i=0; i < fiveDayArr.length; i++){
        var dayBlock = document.createElement("div");
        dayBlock.innerHTML=daily;
        dayBlock.classList="list-item flex-row justify-space-between align-center"
        fiveDayBlock.appendChild(dayBlock);
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
    // var cityUpper=city.toUpperCase();
    // city.setAttribute

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


