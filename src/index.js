console.log('DOM loaded')

const apiEndpoint = "http://localhost:3000/"
const getEnd = apiEndpoint + "pups/"

const pupBar = document.querySelector("#dog-bar")
const pupShow = document.querySelector("#dog-info")

const controller = () => {
  getData()
}

const getData = async () => {
  const data = await fetch(getEnd)
  let array = await data.json()
  array.forEach(renderPup)
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

  let patch = await fetch(getEnd + pup.id, configObj)
  let resp = await patch.json()
  checkToggle(resp, button)

}

controller()