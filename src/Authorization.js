const clientId = "70293d0b13ea4ca5b53bc975873c5879" //You need to set this to your own spotify client Id
const redirectUri = "https://jammming-jesse.netlify.app"  /* "http://localhost:3000" */  //you need to set this redirect URIs to be the same as the one on spotify app dashboard. 
const scope = "user-read-private playlist-modify-private playlist-modify-public user-read-email"

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const state = generateRandomString(16);
localStorage.setItem('spotify_auth_state', state);

export let authorizationUrl = "https://accounts.spotify.com/authorize"
authorizationUrl += `?response_type=token`;
authorizationUrl += `&client_id=${clientId}`;
authorizationUrl += `&scope=${scope}`
authorizationUrl += `&redirect_uri=${redirectUri}`
authorizationUrl += `&state=${state}`;

