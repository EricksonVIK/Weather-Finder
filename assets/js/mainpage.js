// create variables for dom's
var userFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var submitBtn = document.querySelector("#btn");
var city = cityInputEl.value.trim();
var stateInputEl = document.querySelector("#state");
var state = stateInputEl.value.trim();
var historyList = document.querySelector("#searchlist");
var currentDayBlock = document.querySelector("#current");
var fiveDayBlock = document.querySelector("#fiveDay");


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


// lat and lon arrays to pass info through from getLatLonInfo function into getWeatherInfo
var lat =[];
var lon = [];
var weatherArrCurr=[];
// fetch functions
var getWeatherInfo = function (lat, lon){
    console.log("this has been called");
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=0714ff4099a70754b88ad38fab16cccd"
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
            })
        } else {
            alert("Error, unable to connect");
        };
    })
    currentDay();
}
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

// display current day
var currentDay = function (){
    // catching a no info error
    if (weatherArrCurr.length === -1){
        alert("No information available!")
    }
    // current weather displayed
    // currentDayBlock to append
    var currentDisplay = document.createElement("div")
    currentDisplayArr=(weatherArrCurr[0]);
    // above is undefined, but console.log(weatherArrCurr[0].clouds will display in tools)
    // do i need to convert the object into an array? if so, research how
    // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
    currentDisplay.innerHTML=(currentDisplayArr)
    console.log("this is weahterArrCurr")
    console.log(weatherArrCurr)
    console.log("this is currentDisplayArr")
    console.log(currentDisplayArr)
    currentDayBlock.appendChild(currentDisplay);
}



// hard coding city worked
// getLatLonInfo("Durham");
// getWeatherInfo();
// display result function w loop

// account for errors
var displayHistory= function (){
    var searchHistory = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML="";
    searchHistory.forEach(function(history) {
        var historyEl = document.createElement("a");
        historyEl.innerHTML = history;
        historyEl.classList="list-item flex-row justify-space-between align-center"
        historyEl.setAttribute("target", "_blank");   
        historyList.appendChild(historyEl);
        
    });
    // // WHY DOES IT LIST OVER AND OVER
    // for (var i=0; i < searchHistory.length; i++){
    //     searchHistory.forEach(function(history) {
    //     var historyEl = document.createElement("a");
    //     historyEl.innerHTML = history.city +"," + history.state;
    //     historyEl.classList="list-item flex-row justify-space-between align-center"
    //     historyEl.setAttribute("target", "_blank");   
    //     historyList.appendChild(historyEl);
        
    // });

        // var historyEl = document.createElement("a");
        // history.innerHTML = history.city + ", " + history.state;

        // historyList.appendChild(historyEl);
    // } 

}
// saves city history to display under button (state not included)
var savedHistory = function(){
    var cityHistory = JSON.parse (localStorage.getItem('history')) || [];

    var city = cityInputEl.value.trim()

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


