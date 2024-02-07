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
})
.catch(error => console.error(error)); //error message.     
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