const url = 'https://api.kanye.rest/'; //url variable name assigned a value of: https://api.kanye.rest/

fetch(url) //request quotes from server
.then(response => response.json()) //json conversion 
.then(data => {
    document.getElementById('quoteContainer').textContent = data.quote; // id for injected quotes is "quoteContainer". 
})
.catch(error => console.error(error)); //error message.     



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