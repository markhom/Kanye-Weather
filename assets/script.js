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
            //call function to detect user location
            getLocation();
        })

        .catch(error => console.error("error retrieving quote", error)); //error message specific to function     
}

//function to retrieve user coordinates
function getLocation() {
    navigator.geolocation.getCurrentPosition(
        successCall, //success condition, runs the functions needed to populate the data table displayed on the page.
        errorCall, //included to enable high accuracy, also provides a specific error message to allow for easier debugging. 
        {
            enableHighAccuracy: true, //options object, higher accuracy geolocation.
        }
    );
}
function successCall(position) {
    let coord = position.coords;
    let vertical = coord.latitude; //latitude variable
    let horizontal = coord.longitude; //longitude variable

    console.log(vertical, horizontal); // Check console for coordinates
    // Summon the next function
    fetchWeather(vertical, horizontal);
}
function fetchWeather(vertical, horizontal) {
    let weatherKey = '0f155a46c630bcfc919257e207d8ff73'; // API key with specific name
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${vertical}&lon=${horizontal}&appid=${weatherKey}&units=imperial`; //plugged in lat and long
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.list[0]; 
            console.log(weatherData); //CHECK FOR THIS TO MAKE SURE COORDS ARE SUMMONING API INFO FOR YOU. 
            document.getElementById('temperature').textContent = `Temperature: ${weatherData.main.temp}°F`;
            document.getElementById('realFeel').textContent = `Real Feel: ${weatherData.main.feels_like}°F`;
            document.getElementById('weatherConditions').textContent = `Weather Conditions: ${weatherData.weather[0].description}`;
            document.getElementById('precipitation').textContent = `Precipitation: ${weatherData.clouds.all}%`;
            document.getElementById('visibility').textContent = `Visibility: ${weatherData.visibility}`;
            document.getElementById('humidity').textContent = `Humidity: ${weatherData.main.humidity}%`;

            addMap(weatherData);
        })
        .catch(error => console.error("Error fetching weather", error)); // Error message specific to function
}
//function below to display an icon above list of weather conditions. 
function addMap(weatherData) {
    let mapContainer = document.getElementById('theMap'); //this becomes the icon, theMap is the icon and should have a div around it in the html to work.
    let weatherDesignater = weatherData.weather[0].icon; // finds out what the weather is and design
    let picUrl = `https://openweathermap.org/img/wn/${weatherDesignater}.png`; //api icon url link
    $('#theMap').attr('src', picUrl); //pushes this source to the empty html field, with #theMap being the actual image and iconPic being the li container portion (both must be present to function properly)

}
function errorCall(error) {
    console.log("error in getLocation function or user has rejected permissions."); //specific error message for easier debugging. 
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

function getRandomKanyeQuote() {

    quoteGenerator().then((quotes) => {
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

