document.addEventListener("DOMContentLoaded", event => {
  fetch("http://localhost:3000/pups")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      renderPage(json);
    });
  function renderPage(result) {
    result.forEach(element => {
      
      let divTag = document.getElementById("dog-info");
      let imgTag = document.createElement("img");
      let headerTag = document.createElement("h2");
      let goodOrBadDogButton = document.createElement("button");
      divTag.appendChild(imgTag);
      divTag.appendChild(headerTag);
      divTag.appendChild(goodOrBadDogButton);
      imgTag.src = element.image;
      headerTag.innerText = element.name;
      if (element.isGoodDog === true) {
        goodOrBadDogButton.innerText = "Good Dog!";
      } else {
        goodOrBadDogButton.innerText = "Bad Dog!";
      }
      goodOrBadDogButton.addEventListener("click", event => {
        event.preventDefault();
        if ((goodOrBadDogButton.innerText = "Good Dog!")) {
          goodOrBadDogButton.innerText = "Bad Dog!";
          let formData = {
            isGoodDog: false
          };
          patchRequest(formData);
        } else {
          goodOrBadDogButton.innerText = "Good Dog!";
          let formData = {
            isGoodDog: true
          };
          patchRequest(formData);
        }

        function patchRequest(form) {
          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(form)
          };

          fetch(`http://localhost:3000/pups/${element.id}`, configObj)
            .then(function(response) {
              return response.json();
            })
            .then(function(object) {
              console.log(object);
            });
        }
      });
    });
  }

  

  let filterButton = document.getElementById("good-dog-filter");

  filterButton.addEventListener("click", event => {
    event.preventDefault();

    if (filterButton.innerText === "Filter good dogs: OFF") {
      filterButton.innerText = "Filter good dogs: ON";



    } else { filterButton.innerText = "Filter good dogs: OFF";
    }
  });
});
