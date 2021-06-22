

console.log("I wrote this code with my keybord.")

// /using fetch to fetch json data from whether rout and dunping it in main page console
// fetch('http://localhost:300/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const waetherForm = document.querySelector('form')
const search = document.querySelector('input')
const area = document.querySelector('#message-1')
const temperature = document.querySelector('#message-2')


waetherForm.addEventListener('submit',(e) =>{
    e.preventDefault() //prevents browser from refreshing when the search button is clicked
    const location = search.value
    // /using fetch to fetch json data from whether rout and dunping it in main page console
    var url = 'http://localhost:300/weather?address='+location
fetch(url).then((response) => {
    response.json().then((data) => {
        console.log(data);
        area.textContent = data.Area
        temperature.textContent = data.Temperature
    })
})
})