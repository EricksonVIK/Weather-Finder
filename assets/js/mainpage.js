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
    console.log(event)
}

// userFormEl.addEventListener("submit", submitCS);

// store input and display  - make "clickable"

// event function to redisplay city on click

// fetch function
var getLatLonInfo = function (city){
    console.log("called");
    // format weather api
    // geo code to get long and lat
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ",NC,USA&limit=1&appid=0714ff4099a70754b88ad38fab16cccd"
    fetch(geoUrl)
        .then(function(response){
            if (response.ok){
                // console worked
                console.log(response);
                response.json().then(function(data){
                    // worked
                    console.log(data);
                });
            } else {
                alert("City Not Found");
            };
        });
}
// hard coding city worked
// getLatLonInfo("Durham");
// display result function w loop

// account for errors

// add event listener for saved directory
// add event listner for city input
userFormEl.addEventListener("submit", submitCS);



