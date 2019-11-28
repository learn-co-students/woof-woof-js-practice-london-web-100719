//api
const apiHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

const get = url => {
  return fetch(url).then(resp => resp.json());
};

const patch = (url, id, dog) => {
  return fetch(url + id, {
    method: "PATCH",
    headers: apiHeaders,
    body: JSON.stringify(dog)
  }).then(resp => resp.json());
};

const API = { get, patch };

//event listeners
document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
  activateGoodDogFilter();
});

//const
const DOGS_URL = "http://localhost:3000/pups/";

//functions
const activateGoodDogFilter = () => {
  const goodDogFilter = document.querySelector("#good-dog-filter");

  goodDogFilter.addEventListener("click", () => {
    if (goodDogFilter.className) {
      goodDogFilter.classList.remove("active");
      goodDogFilter.innerText = "Filter good dogs: OFF";
      displayAllDogs();
      console.log("toggled OFF");
    } else {
      goodDogFilter.className = "active";
      goodDogFilter.innerText = "Filter good dogs: ON";
      displayGoodDogs();
      console.log("toggled ON");
    }
  });
};

const displayGoodDogs = () => {
  clearDogs();
  fetchGoodDogs();
};

const displayAllDogs = () => {
  clearDogs();
  fetchDogs();
};

const clearDogs = () => {
  const dogBarDiv = document.querySelector("#dog-bar");
  while (dogBarDiv.firstChild) {
    dogBarDiv.firstChild.remove();
  }
};

const fetchDogs = () => {
  API.get(DOGS_URL).then(dogsData => dogsData.forEach(dog => listDog(dog)));
};

const fetchGoodDogs = () => {
  API.get(DOGS_URL)
    .then(dogsData => dogsData.filter(dog => dog.isGoodDog === true))
    .then(goodDogs => goodDogs.forEach(goodDog => listDog(goodDog)));
};

const listDog = dog => {
  const dogBarDiv = document.querySelector("#dog-bar");

  const span = document.createElement("span");
  span.innerText = dog.name;
  span.className = dog.isGoodDog;
  span.addEventListener("click", () => showDogInfo(dog, span));

  dogBarDiv.append(span);
};

const showDogInfo = (dog, span) => {
  const dogInfo = document.querySelector("#dog-info");
  while (dogInfo.firstChild) {
    dogInfo.firstChild.remove();
  }

  const img = document.createElement("img");
  img.src = dog.image;

  const h2 = document.createElement("h2");
  h2.innerText = dog.name;

  const goodButton = document.createElement("button");
  dog.isGoodDog
    ? (goodButton.innerText = "Good Dog!")
    : (goodButton.innerText = "Bad Dog!");
  goodButton.addEventListener("click", () =>
    toggleGoodBad(dog, goodButton, span)
  );

  dogInfo.append(img, h2, goodButton);
};

const toggleGoodBad = (dog, goodButton, span) => {
  const goodDogFilter = document.querySelector("#good-dog-filter");

  dog.isGoodDog = !dog.isGoodDog;
  span.className = !span.className;
  API.patch(DOGS_URL, dog.id, dog)
    .then(patchedDog => {
      patchedDog.isGoodDog
        ? (goodButton.innerText = "Good Dog!")
        : (goodButton.innerText = "Bad Dog!");
    })
    .then(() => {
      if (goodDogFilter.className === "active") {
        displayGoodDogs();
      }
    })
    .catch(error => console.log(error.message));
};
