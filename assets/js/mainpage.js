// create variables for dom's
var userFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var submitBtn = document.querySelector("#btn");
var city = cityInputEl.value.trim();
var stateInputEl = document.querySelector("#state");
var state = stateInputEl.value.trim();
var historyList = document.querySelector("#searchlist");


// array to store city search history
// var cityHistory={};


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


// store input and display  - make "clickable"

// event function to redisplay city on click
var lat =[];
var lon = [];
// fetch functions
var getWeatherInfo = function (lat, lon){
    console.log("this has been called");
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=0714ff4099a70754b88ad38fab16cccd"
    fetch (apiUrl)
    .then(function (response){
        if (response.ok){
            // console.log(response);worked
            response.json().then(function(data){
                console.log(data);
               
            })
        };
    })
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
                    console.log(data);
                   var latr = (data ['lat']);
                   var lonr = (data ['lon']);
                   lat.push(latr)
                   lon.push(lonr)
                   console.log(latr);
                   console.log(lat);
                });
            } else {
                alert("City Not Found");
            };
            
        });
        // getWeatherInfo();

}
// hard coding city worked
// getLatLonInfo("Durham");
// getWeatherInfo();
// display result function w loop

// account for errors
var displayHistory= function (){
    var searchHistory = JSON.parse(localStorage.getItem('history')) || [];

    searchHistory.forEach(function(history) {
        var historyEl = document.createElement("li");
        historyEl.innerHTML = history.city +"," + history.state;

        historyList.appendChild(historyEl);
        
    });

}
var savedHistory = function(){
    var cityHistory = JSON.parse (localStorage.getItem('history')) || [];

    cityHistory.push({
        city: cityInputEl.value.trim(),
        state: stateInputEl.value.trim(),
    });

    localStorage.setItem("history", JSON.stringify(cityHistory));
};

// add event listener for saved directory
// add event listner for city input
userFormEl.addEventListener("submit", submitCS);


