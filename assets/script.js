//link to button, listen for click, call anon function to start chain of functions that should run sequentially but appear as if loading simultaneously to the user. 
document.getElementById("clickEvent").addEventListener("click", function(){ 
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
.catch(error => console.error(error)); //error message.     
}
//function to retrieve user coordinates
 function getLocation() {
     navigator.geolocation.getCurrentPosition( //changed to getCurrentPosition to avoid violating api rules for how many requests can be made (not more than one per second) 
        successCall, //success condition
        errorCall, //error only here so I can include the high accuracy object. 
        {
            enableHighAccuracy:true, //options object, higher accuracy geolocation.
        }  
        );
        // return userLocate;
 }

 function successCall(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;

//Nearest city based on coords.
fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`) //when the users lat and long are successfully retrieved they are used as variables here.
    .then(response => response.json())
    .then(data => {
        let closestCity = data.address.city;
        console.log(closestCity); //check console for city name.
    })
 }

 function errorCall(error) {
console.log("error in getLocation function"); 
 }

$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
    });
    
    $(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
    });


document.addEventListener('ContentLoaded', function(){
    updateRunCountDisplay();
})

function updateRunCountDisplay() {
    let runCount = localStorage.getItem('runCount');

    if (runCount === null) {
        runCount = 0;
    }
    document.getElementById('runCountDisplay').innerText = 'Kanye West gave you ' + runCount + ' quote(s) of inspiration.';
}
function resetRunCount() {
    localStorage.removeItem('runCount');
    updateRunCountDisplay();
}