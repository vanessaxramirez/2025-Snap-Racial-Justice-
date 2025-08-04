fetch("https://www.nowhiteboard.org/?&page=1&company=Quizlet").then( (htmlMaybe) => {
    return htmlMaybe.text()
}
).then( (htmlSuperMaybe) => {
    console.log(htmlSuperMaybe)
    // remove the extra stuff that isn't the JSON data we want

    // use JSON.parse() to turn it into an object/array
})//Can also use filters for nowhiteboard to get smaller lists like how we did for postman 
// https://www.nowhiteboard.org/?&page=1