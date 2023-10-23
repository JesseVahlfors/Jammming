const clientId = "70293d0b13ea4ca5b53bc975873c5879"
const redirectUri = "http://localhost:3000"
const scope = "user-read-private user-read-email"

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


/* const accessToken = window.location.href.get("access_token")
const expiresIn = window.location.href.get("expires_in")
setAccessToken(accessToken, expiresIn); */