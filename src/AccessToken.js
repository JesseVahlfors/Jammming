let accessToken = null;
let tokenExpiration = null;

export const setAccessToken = (token, expiresIn) => {
    accessToken = token;
    tokenExpiration= new Date().getTime() + expiresIn * 3600;

    clearURLParameters();
};

export const getAccessToken = () => {
    if (!accessToken || new Date().getTime() > tokenExpiration) {
        // Token is expired or not set
        return null;
    }

    return accessToken
}


function clearURLParameters() {
    // Remove sensitive parameters from the URL.
    const newUrl = window.location.href.split('#')[0]; // Remove fragment
    history.replaceState(null, document.title, newUrl);
  }