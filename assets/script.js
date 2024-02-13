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
            console.log(data);
            console.log(closestCity); //check console for city name.
            //summon the next function
            fetchWeather(closestCity);
        })
        .catch(error => console.error("error retrieving coordinates", error)); //error message specific to function
}
//weather api
function fetchWeather(closestCity) {
    let weatherKey = '0f155a46c630bcfc919257e207d8ff73'; //api key with specific name
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${closestCity}&appid=${weatherKey}&units=imperial`; //url used to fetch, units=imperial is important to avoid inserting high school math into your javascript.                    

    fetch(weatherUrl)
    .then(response => response.json())
    .then (data => {
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°F`; //accessing specific api data off this list: https://openweathermap.org/api/one-call-3 
        document.getElementById('realFeel').textContent = `Real Feel: ${data.main.feels_like}°F`;
        document.getElementById('weatherConditions').textContent = `Weather Conditions: ${data.weather[0].description}`; 
        document.getElementById('precipitation').textContent = `Precipitation: ${data.clouds.all}%`; 
        document.getElementById('visibility').textContent = `Visibility: ${data.visibility}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;              
        addMap(data) //calling the next function, ensuring all relevant data is passed on correctly.
    })
    .catch(error => console.error("error fetching weather", error)); //error message specific to function
}
    //function below to display an icon above list of weather conditions. 
    function addMap(weatherData) { 
        let mapContainer = document.getElementById('theMap'); //this becomes the icon, theMap is the icon and should have a div around it in the html to work.
        let weatherDesignater = weatherData.weather[0].icon; // finds out what the weather is and design
        let picUrl = `https://openweathermap.org/img/wn/${weatherDesignater}.png`; //api icon url link
        $('#theMap').attr('src', picUrl); //pushes this source to the empty html field, with #theMap being the actual image and iconPic being the li container portion (both must be present to function properly)
       
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

function getRandomKanyeQuote() {   // new function to get random kanye quote at click
     
    quoteGenerator().then((quotes) => {  // calling quote generator function
        if (quotes.length > 0) {
            
            const randomIndex = Math.floor(Math.random() * quotes.length);

            // show randomly selected quote
            document.getElementById('quoteContainer').innerText = quotes[randomIndex];
        } 
    }).catch((error) => {
            // display if error
        console.error("Error fetching Kanye quotes", error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof(Storage) !== "undefined") {

        let pageLoadCount = localStorage.getItem('pageLoadCount') || 0;

        pageLoadCount++;

        document.getElementById('loadCount').textContent = `This page has been loaded ${pageLoadCount} times.`;

        localStorage.setItem('pageLoadCount', pageLoadCount);
            } 
    }
)