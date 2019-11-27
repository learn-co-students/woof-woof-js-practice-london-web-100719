document.addEventListener("DOMContentLoaded", function() {

    renderPups()
  
});

// API
const get = (url) => fetch(url).then(resp => resp.json())

const post = (url, method, boolean) => fetch(url, {
    method: method,
    headers: header,
    body: JSON.stringify({
        isGoodDog: boolean
    })
    }).then(resp => resp.json())

const header = {
                "Content-Type": "application/json",
                Accept: "application/json"
              }


API = {
    get,
    post
}

// consts

const URL = "http://localhost:3000/pups/"
let filter = false

// functions

function renderPups(){
    API.get(URL)
    .then(displayPups)
}

function displayPups(pups){
    const dogInfoDiv = document.getElementById("dog-bar")
    const filterLabel = document.getElementById("good-dog-filter")
    filterLabel.addEventListener('click', () => filterPups(pups, dogInfoDiv, filterLabel))
    pups.forEach( (pup) => addPup(pup, dogInfoDiv)) 
}



function filterPups(pups, dogInfoDiv, filterLabel){

    if (filter === false){
        filterLabel.innerText = "Filter good dogs: ON"
        filter = true
        pups = pups.filter( (pup) => pup.isGoodDog === true)
    } else {
        filterLabel.innerText = "Filter good dogs: OFF"
        filter = false
    }
    removeChildren(dogInfoDiv)
    pups.forEach( (pup) => addPup(pup, dogInfoDiv))
}

function addPup(pup, dogInfoDiv){
    const span = createElementWith("span", "innerText", pup.name)
    span.style.backgroundColor = "white"
    span.addEventListener(`click`, () => renderThumbnail(pup))
    dogInfoDiv.append(span)
}


function renderThumbnail(pup){
    const dogInfoDiv = document.getElementById("dog-info")

    removeChildren(dogInfoDiv)

    let button
    const h2 = createElementWith("h2", "innerText", pup.name)
    const img = createElementWith("img", "src", pup.image)
    const br = createElementWith("br")
   

    if (pup.isGoodDog === true){
    button = createElementWith("button", "innerText", "Good Dog!")
    } else {
    button = createElementWith("button", "innerText", "Bad Dog!")
    }

    button.addEventListener(`click`, () => changeDogBehaviour(pup, button) )

    dogInfoDiv.append(h2,img,br, button)
}

function changeDogBehaviour(pup, button){

    let boolean, newButtonText

    if (pup.isGoodDog === true){
        boolean = false
        pup.isGoodDog = false
        newButtonText = "Bad Dog!"
    } else {
        boolean = true
        pup.isGoodDog = true
        newButtonText = "Good Dog!"
    }
    
    API.post(URL + pup.id, "PATCH", boolean)
    .then(() => button.innerText = newButtonText)
}

    


// helper method createWith and removeChildren

function createElementWith(element, type, value, type1, value1){
    const newEl = document.createElement(element)
    newEl[type] = value
    newEl[type1] = value1
    return newEl
}

function removeChildren(element){
element.querySelectorAll("*").forEach( (n) => n.remove()) 
}