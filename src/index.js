console.log('DOM loaded')

const apiEndpoint = "http://localhost:3000/"
const getEnd = apiEndpoint + "pups/"

const pupBar = document.querySelector("#dog-bar")
const pupShow = document.querySelector("#dog-info")
const btnFilter = document.querySelector("#good-dog-filter")
btnFilter.className = "off"

btnFilter.addEventListener("click", () => filterPups(btnFilter))

const controller = () => {
  getData().then(el => el.forEach(renderPup)
  )}

const getData = async () => {
  const data = await fetch(getEnd)
  let array = await data.json()
  return array
}

const renderPup = (pup) => {
  let span = document.createElement("span")
  span.textContent = pup.name

  span.addEventListener("click", () => showPup(pup))

  pupBar.append(span)
}

const showPup = (pup) => {

  pupShow.innerHTML = null

  let img = document.createElement("img")
  let h2 = document.createElement("h2")
  let button = document.createElement("button")

  img.src = pup.image
  h2.textContent = pup.name
  
  checkToggle(pup,button)

  button.addEventListener("click", () => toggleGoodBoiness(pup, button))

  pupShow.append(img, h2, button)

}

const checkToggle = (pup,button) => {
  if (pup.isGoodDog) {
    button.textContent = "good Dog!"
  } else {
    button.textContent = "Bad Dog!"
  }
}

const toggleGoodBoiness = async (pup, button) => {
  pup.isGoodDog ? pup.isGoodDog = false : pup.isGoodDog = true

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pup)
  }

  let resp = await fetch(getEnd + pup.id, configObj)
  let json = await resp.json()
  checkToggle(json, button)

}

const filterPups = (button) => {
  if (button.className === "off") {
    button.className = "on"
    button.textContent = "Filter good dogs ON"

    while (pupBar.firstChild) {
      pupBar.removeChild(pupBar.firstChild)
    }

    getData()
    .then(array => array.filter(el => !el.isGoodDog))
    .then(el => el.forEach(renderPup))
  } else {
    while (pupBar.firstChild) {
      pupBar.removeChild(pupBar.firstChild)
    }
    button.textContent = "Filter good dogs OFF"
    button.className = "off"
    getData()
    .then(el => el.forEach(renderPup))
  }
}

controller()