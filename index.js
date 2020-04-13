// // authorize request
// const Spotify = require('spotify-web-api-node');
// const spotifyApi = new Spotify({
//   clientId: '39146e5690b2463780ac5fe7192bd1dd',
//   clientSecret: '6cedbf355b424807933f8995cf55549c',
//   redirectUri: 'http://musicselect://callback'
// });

// // redirect to spotify authorization URL
// router.get('/login', (_, res) => {
//     const state = generateRandomString(16);
//     res.cookie(STATE_KEY, state);
//     res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
//   });



// // click function for drop down to select value from genre 
// function onClick(){
//     var genreSelect = $("#genre").change(function(event)
//     {console.log($(this).val())
//     var genreInput = $(this).val()
    
    
    
    
//     })
//     console.log(genreSelect)
// }
// onClick()

