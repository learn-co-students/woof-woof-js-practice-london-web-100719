// API 

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
document.addEventListener("DOMContentLoaded", function(){

const getApi = (url) => fetch(url).then(res => res.json())
const patch = (url, patchInfo) => fetch(url, { method: "PATCH", headers: headers, body: JSON.stringify(patchInfo)} ).then(res => res.json())
const deleteApi = url => fetch(url, {method: "DELETE"}).then(res => res.json())


const API = {getApi, patch, deleteApi}

// Const 

const dogURL = "http://localhost:3000/pups"

const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const sortButton = document.querySelector('#good-dog-filter')


// Functions


    API.getApi(dogURL).then(data => data.forEach(dog => renderDog(dog)) )

    
    function renderDog(dog){
        
        const newSpan = document.createElement('span')
        newSpan.innerHTML = dog.name
        
        dogBar.appendChild(newSpan)

        newSpan.addEventListener('click', () => showDogInfo(dog)) //showDogInfo(dog)
    }

    function showDogInfo(dog) {
        dogInfo.innerHTML = "";
        
        const newh2 = document.createElement('h2')
        newh2.innerHTML = dog.name 

        const newImg = document.createElement('img')
        newImg.src = dog.image

        const newButton = document.createElement('button')
        isdogGoodOrbad(dog, newButton)

        dogInfo.append(newImg, newh2, newButton)

        newButton.addEventListener('click', () => switchDogAtt(dog, newButton))
    }

    function isdogGoodOrbad(dog, newButton){
        dog.isGoodDog? (newButton.innerHTML = "Good Dog!") : (newButton.innerHTML = "Bad Dog!")
    }

    function switchDogAtt(dog, newButton) {
        dog.isGoodDog = !dog.isGoodDog
        let dogInfo = {
            isGoodDog: dog.isGoodDog,
        }
        API.patch(`${dogURL}/${dog.id}`, dogInfo)
        isdogGoodOrbad(dog, newButton)
    }

    sortButton.addEventListener('click', () => filterTheDogs()) 

    function filterTheDogs() {
        // switch 
        debugger
    }
})