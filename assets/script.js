//link to button, listen for click, call anon function to start chain of functions that should run sequentially but appear as if loading simultaneously to the user. 
document.getElementById("start").addEventListener("click", function () {
    quoteGenerator()
});
function quoteGenerator() {
    const url = 'https://api.kanye.rest/'; //url variable name assigned a value of: https://api.kanye.rest/
    fetch(url) //request quotes from server
        .then(response => response.json()) //json conversion 
        .then(data => {
            document.getElementById('quoteContainer').textContent = data.quote; // id for injected quotes is "quoteContainer". 
            //call function to automatically detect user location
            getLocation();
        })
        .catch(error => console.error("error retrieving quote", error)); //error message specific to function     
}
//function to retrieve user coordinates
function getLocation() {
    navigator.geolocation.getCurrentPosition( //changed to getCurrentPosition to avoid violating api rules for how many requests can be made (not more than one per second) 
        successCall, //success condition
        errorCall, //error only here so I can include the high accuracy object. 
        {
            enableHighAccuracy: true, //options object, higher accuracy geolocation.
        }
    );
}

function successCall(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //Nearest city based on coords. nominatim api + openstreetmap
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`) //when the users lat and long are successfully retrieved they are used as variables here.
        .then(response => response.json())
        .then(data => {
            let closestCity = data.address.city;
            console.log(closestCity); //check console for city name.
            //summon the next function
            fetchWeather(closestCity);
        })
        .catch(error => console.error("error retrieving coordinates", error)); //error message specific to function
}
//weather api
function fetchWeather(closestCity) {
    let weatherKey = '0f155a46c630bcfc919257e207d8ff73'; //api key with specific name
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${closestCity}&appid=${weatherKey}`; //url used to fetch. 

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Weather for", closestCity + ":", data); //sends raw data to console
            //replace above with getelementbyid insertions
            displayWeather(data, closestCity); //calling the next function
        })
        .catch(error => console.error("error fetching weather", error)); //error message specific to function
}
//function to insert the previously fetched weather data and place it within pre-existing html. 
function displayWeather(weatherData, closestCity) {
    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = "";

    //was getting units back in kelvin, converting to farenheiht below



    let temperature = document.createElement('p');
    temperature.textContent = `It is currently ${weatherData.main.temp} in ${closestCity}, ${weatherData.weather[0].description} can be expected when venturing outdoors`;
    weatherContainer.appendChild(temperature);
}
function errorCall(error) {
    console.log("error in getLocation function or user has rejected permissions.");
}

$(".modal-button").click(function () {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".modal-close").click(function () {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});


$(document).ready(function () {
    //show modal on start click
    $('#start').click(function () {
        //hide modal on exit
        $('#startContainer').hide();
        $('#kanye').show();

      });
});

