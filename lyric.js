const CLIENT_ACCESS_TOKEN = "zyYE1qav_IA43edG-P2l4kHk-3P2flxUxBPCxXWbrSZK-1bldjj6ZDxhbY1ZM0da"

function $(selector) {
    return document.querySelector(selector);
}
function buildUrl(query) {
    return `https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${CLIENT_ACCESS_TOKEN}`;
}

const queryInput = $('#query');
const searchButton = $('#btnSearch');
const songsContainer = $('#songsContainer');
const errorsElement = $('#errors');

searchButton.addEventListener('click', search);

function callGenuisAPI(query) {
    return fetch(buildUrl(query)).then(response => response.json()).catch(error => console.log(error));
}
function buildTemplate(data){
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
            <a class="card-footer-item" href="${data.lyriclink}" target="_blank">Lyrics on Genius</a>
        <footer>
    </div>
    `
}
function search(event) {
    errorsElement.innerHTML = null;
    event.preventDefault();

    const query = queryInput.value;

    if (!query) {
        errorsElement.innerHTML = "Input is Required"
        return;
    }
callGenuisAPI(query).then(data =>{
    console.log(data);
    const hits = data.response.hits;
    const results = []
    for(let i = 0; i < hits.length; i++){
        const item = hits[i].result;
        results.push(item)
    }
    const resultData = [];
    for(let i = 0; i < results.length; i++){
        const item = results[i];

        const obj = {
            title: item.title_with_featured,
            artist: item.primary_artist.name,
            thumbnail: item.song_art_image_thumbnail_url,
            lyriclink: item.url
        }
        resultData.push(obj);
    }

    const htmlArray = [];
    for( let i = 0; i < resultData.length; i++){
        const item = resultData[i];
        htmlArray.push(buildTemplate(item))
    }
    console.log(resultData)
    const html = htmlArray.join("");
    songsContainer.innerHTML = html;

})

}
queryInput.value = "Hey Ya";