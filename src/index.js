

document.addEventListener("DOMContentLoaded", function() {

    const DOG_BAR = document.querySelector('#dog-bar')
    const DOG_INFO = document.querySelector('#dog-info')
    const FILTER_BUTTON = document.querySelector("#good-dog-filter")
    const URL = "http://localhost:3000/pups"
    let FILTER_ON = false
    


    fetch(URL)
    .then(resp => resp.json())
    .then(data => data.forEach(addToPage))

    FILTER_BUTTON.addEventListener("click", function() {
        FILTER_ON = !FILTER_ON
        let falseys = document.getElementsByClassName("false")
        let falseArray = Array.from(falseys)
        FILTER_ON ? (falseArray.forEach( x => x.style.display = "none")) : (falseArray.forEach( x => x.style.display = "block"))
        })


    function addToPage(dogObj) {

        let dogLi = document.createElement('span')
        dogLi.innerText = dogObj.name
        dogLi.className = `${dogObj.isGoodDog}`
        dogLi.style.display = "block"
        DOG_BAR.appendChild(dogLi)

        let dogInfo = document.createElement('card')
        let dogPic = document.createElement('img')
        dogPic.src = dogObj.image
        let dogButton = document.createElement('button')
        let dogName = document.createElement('h2')
        dogName.innerText = dogObj.name

        dogInfo.appendChild(dogName)
        dogInfo.appendChild(dogPic)
        dogInfo.appendChild(dogButton)

        dogObj.isGoodDog ? (dogButton.innerText = "Turn Bad :o") : (dogButton.innerText = "Turn Good :)")

        dogButton.addEventListener("click", function() {
            dogObj.isGoodDog = !dogObj.isGoodDog
            dogObj.isGoodDog ? (dogButton.innerText = "Turn Bad :o") : (dogButton.innerText = "Turn Good :)")
            dogLi.className = !dogLi.className

            configObj = {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !dogObj.isGoodDog
                })
            }
            fetch(`${URL}/${dogObj.id}`, configObj)
            .then(resp => resp.json())

        })

        dogLi.addEventListener("click", function() {
            DOG_INFO.innerHTML = ""
            DOG_INFO.appendChild(dogInfo)
        })

    }

})