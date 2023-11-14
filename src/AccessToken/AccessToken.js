let accessToken = null;
let tokenExpiration = null;
let interval = null;

export const setAccessToken = (token, expiresIn) => {
    accessToken = token;
    tokenExpiration = new Date().getTime() + expiresIn * 1000;
};

export const getAccessToken = () => {
    if (accessToken === null) {
        // Token is not set
        return null;
    }

    if (new Date().getTime() > tokenExpiration) {
        // Token is expired
        return null;
    }
    return accessToken;
}


export function clearURLParameters() {
    // Remove sensitive parameters from the URL.
    const newUrl = window.location.href.split('#')[0]; // Remove fragment
    window.location.replace(newUrl)
  }

function logOutAfterExpiration() {
    if(accessToken && new Date().getTime() > tokenExpiration) {
        clearURLParameters();
        accessToken = null;
        tokenExpiration = null;
    }
}

function checkAccessTokenExpiration() {
    if (!accessToken) {
        clearInterval(interval);
    } else {
        clearInterval(interval);
       interval = setInterval(logOutAfterExpiration, 60000);
    }
   
}

checkAccessTokenExpiration();