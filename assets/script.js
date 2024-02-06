const url = 'https://api.kanye.rest/'; //url variable name assigned a value of: https://api.kanye.rest/

fetch(url) //request quotes from server
.then(response => response.json()) //json conversion 
.then(data => {
    document.getElementById('quoteContainer').textContent = data.quote; // id for injected quotes is "quoteContainer". 
})
.catch(error => console.error(error)); //error message.     
