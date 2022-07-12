// create variables for dom's
var userFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var submitBtn = document.querySelector("#btn");
var city = cityInputEl.value.trim();
var stateInputEl = document.querySelector("#state");
var state = stateInputEl.value.trim();

// array to store city search history
var cityHistory=[]

// form submit function
var submitCS = function(event){
    // prevent page from refreshing
    event.preventDefault();
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

// fetch functions
var getWeatherInfo = function (){
    console.log("this has been called");
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=0714ff4099a70754b88ad38fab16cccd"
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
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",USA&limit=1&appid=0714ff4099a70754b88ad38fab16cccd"
    fetch(geoUrl)
        .then(function(response){
            if (response.ok){
                // console.log(response); worked
                response.json().then(function(data){
                    console.log(data);
                });
            } else {
                alert("City Not Found");
            };
        });
}
// hard coding city worked
// getLatLonInfo("Durham");
getWeatherInfo();
// display result function w loop

// account for errors

// add event listener for saved directory
// add event listner for city input
userFormEl.addEventListener("submit", submitCS);



