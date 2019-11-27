const apiEndpoint = 'http://localhost:3000';
const pupsPath = apiEndpoint + '/pups';

const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
const dogFilterButton = document.querySelector('#good-dog-filter');
let filterDogs = false;

dogFilterButton.addEventListener('click', (event) => toggleFiltering(event));


const fetchData = () => {

	fetch(pupsPath)
	.then(res => res.json())
	.then(pupsArray => pupsArray.forEach(renderPup))

};

const renderPup = (pup) => {

	let span = document.createElement('span');

	span.id = 'pup-' + pup.id;
	span.textContent = pup.name;
	span.dataset.goodBoiness = pup.isGoodDog;

	span.addEventListener('click', () => showPupInfo(pup));

	dogBar.append(span);

};

const showPupInfo = (pup) => {

	while (dogInfo.firstChild) {

		dogInfo.removeChild(dogInfo.firstChild);

	};

	let img = document.createElement('img');
	let h2 = document.createElement('h2');
	let button = document.createElement('button');

	img.src = pup.image;
	h2.textContent = pup.name;

	checkGoodBoiness(pup, button);

	button.addEventListener('click', () => toggleGoodBoiness(pup, button));

	dogInfo.append(img, h2, button);

};

const checkGoodBoiness = (pup, button) => {

	if (pup.isGoodDog) {

		button.textContent = 'Good pupperino!';

	} else {

		button.textContent = 'Still a good pupperino!';

	};

};

const toggleGoodBoiness = (pup, button) => {

	pup.isGoodDog ? pup.isGoodDog = false : pup.isGoodDog = true;

	patchObject = {

		method: "PATCH",
		headers: {

			"Content-Type": "application/json",
			"Accept": "application/json"

		},
		body: JSON.stringify(pup)

	};

	fetch(`${pupsPath}/${pup.id}`, patchObject)
	.then(res => res.json())
	.then((pupper) => checkGoodBoiness(pupper, button))

};

const toggleFiltering = (event) => {

	const button = event.target;

	if (filterDogs) {

		button.textContent = 'Filter good dogs: OFF';
		filterDogs = false;
		showAllDoggos();

	} else {

		button.textContent = 'Filter good dogs: ON';
		filterDogs = true;
		hideBadDoggos();

	}

};

const showAllDoggos = () => {

	dogBar.childNodes.forEach(element => {

		if (element.id) {

			element.style.display = '';

		};

	});

};

const hideBadDoggos = () => {

	dogBar.childNodes.forEach(element => {

		if (element.id) {

			if (element.dataset.goodBoiness == 'false') {

				element.style.display = 'none';

			};

		};

	});

};

fetchData();