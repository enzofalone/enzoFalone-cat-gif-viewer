const API_KEY = 'INSERT GIPHY API KEY HERE'

// GLOBAL CONSTANTS

// API request params
const limit = 9; // limit of received files per request
const rating = 'g'; // audience rating of images
const lang = 'en'; // gif language

// elements
const mainEl = document.querySelector('main');
const form = document.querySelector('form');
const resetButton = document.querySelector('#button-reset');

const sectionEl = document.querySelector('section');
const gifContainer = sectionEl.querySelector('#container');
const showMoreButton = sectionEl.querySelector('.button-more');

// variables
let pages = 0;
let lastUserQuery = '';
let userQuery = 'cats';
async function getResults(e) {
    // prevent the page from reloading
    e.preventDefault();

    userQuery = form.query.value;

    //if query changed, reset pages.
    if (lastUserQuery !== userQuery) {
        pages = 0;
        lastUserQuery = userQuery;
    }

    // debugging
    console.log(`user submitted: ${userQuery}`);

    // send query with predefined parameters
    response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${userQuery}&limit=${limit}&rating=${rating}&lang=${lang}&offset=${pages*limit}`);

    // debugging
    console.log(response);

    // finish request by converting to json
    let jsonResponse = await response.json();

    // debugging
    console.log(jsonResponse.data);

    // increment pages variable;
    pages++;

    // pass data to be displayed
    displayResults(jsonResponse.data);
}

const translateMainSection = (main) => {
    main.style.height = 'fit-content';
}

const showShowMoreButton = (section) => {
    if (showMoreButton.classList.contains("hidden")) {
        showMoreButton.classList.remove("hidden");
    }

    // let buttonEl = document.createElement("button");
    // buttonEl.id = btnMoreId;
    // buttonEl.textContent = "Show More!";
}

const hideShowMoreButton = () => {
    if (!showMoreButton.classList.contains("hidden")) {
        showMoreButton.classList.add("hidden");
    }
}

const cleanResults = () => {
    gifContainer.innerHTML = ``;
    hideShowMoreButton();
}

const displayResults = (dataObject) => {
    // translate main section to the top (will only work for the first time it is ran)
    translateMainSection(mainEl);

    // clear area
    cleanResults();

    // // reset pages as it is a new query
    // pages = 0;

    console.log("displaying results...")
    // iterate through object to 
    dataObject.forEach((val) => {
        gifContainer.innerHTML += `<img class="result-image"src="${val.images.original.url}">`
    });

    // add a "Show more!" button
    showShowMoreButton();

}

window.onload = () => {
    //add listeners here
    form.addEventListener('submit', getResults);
    showMoreButton.addEventListener('click', getResults);
    resetButton.addEventListener('click', cleanResults);
}