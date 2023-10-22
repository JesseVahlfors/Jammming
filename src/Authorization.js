import { setAccessToken } from "./AccessToken";
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

const authorizationUrl = "https://accounts.spotify.com/authorize"
+ `?response_type=token`;
+ `&client_id=${clientId}`;
+ `&scope=${scope}`
+ `&redirect_uri=${redirectUri}`
+ `&state=${state}`;

window.location.href = authorizationUrl;