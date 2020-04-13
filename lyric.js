//API token from Genius
const CLIENT_ACCESS_TOKEN = "zyYE1qav_IA43edG-P2l4kHk-3P2flxUxBPCxXWbrSZK-1bldjj6ZDxhbY1ZM0da"
// created selector function similar to jquery
function element(selector) {
    return document.querySelector(selector);
}
// function to build url with access token 
function buildUrl(query) {
    return `https://api.genius.com/search?q=${query}&access_token=${CLIENT_ACCESS_TOKEN}`;
}
// variable to store html elements
const queryInput = element('#query');
// focus to queryUser input
queryInput.focus();
const searchButton = element('#btnSearch');
const songsContainer = element('#songsContainer');
const errorsElement = element('#errors');
// create click event listener
searchButton.addEventListener('click', search);
// this was copied straight from Bulma for active hamburger button icon for small screens
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

function callGeniusAPI(queryFromUser) {
    // using fetch API to return json or error
    return fetch(buildUrl(queryFromUser))
        // if response is successful, return json
        .then(response => response.json())
        // if error, log error
        .catch(error => console.log(error));
}
// template to push data to html using Bulma classes
function buildTemplate(data) {
    return `
    <div class="card">
        <div class="card-content">
            <div class="card-media">
                <div class="card-media-left">
                    <figure class="image is-128x128">
                        <img src="${data.thumbnail}"/>
                    </figure>
                </div>
                <div class="media-content"></div>
                <p class="title">${data.title}</p>
                <p class="subtitle">By ${data.artist}<p>
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" href="${data.lyricLink}" target="_blank">Lyrics on Genius</a>
        <footer>
    </div>
    `
}
// to run when search button is clicked
function search() {
    // use to empty errors
    errorsElement.innerHTML = null;
    // value from user input
    const query = queryInput.value;

    if (!query) {
        // if query is empty message displays for user
        errorsElement.innerHTML = "Input is Required"
        queryInput.focus();
        return;
    }

    callGeniusAPI(query).then(data => {
        // step 1 retrieve hits from API
        const hits = data.response.hits;
        // step 2 looping thru hits to find result object
        const results = []
        for (let i = 0; i < hits.length; i++) {
            const item = hits[i].result;
            results.push(item)
        }
        // step 3 looping results to find desired info 
        const resultData = [];
        for (let i = 0; i < results.length; i++) {
            const item = results[i];
            // step 4 create objects with info
            const obj = {
                title: item.title_with_featured,
                artist: item.primary_artist.name,
                thumbnail: item.song_art_image_thumbnail_url,
                lyricLink: item.url
            }
            resultData.push(obj);
        }
        // step 5 push result data to template 
        const htmlArray = [];
        for (let i = 0; i < resultData.length; i++) {
            const item = resultData[i];
            const template = buildTemplate(item);
            htmlArray.push(template)
        }
        console.log(resultData)
        // step 6 adds template to html songs container 
        const html = htmlArray.join("");
        songsContainer.innerHTML = html;

    })

}
