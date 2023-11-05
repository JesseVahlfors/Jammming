import { useState, useEffect } from "react";
import { getAccessToken } from "./AccessToken";


function GetUserId({ onUserIdReceived }) {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const accessToken = getAccessToken();
        if(accessToken) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(`Failed to fetch ID: ${response.statusText}`);
                })
                .then((data) => {
                    setUserId(data.id);
                    onUserIdReceived(data.id);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                })                
        }
    }, [onUserIdReceived]);

    if (loading) {
        return <p>Loading user ID...</p>
    } else if (error) {
        return <p>Error: {error.message}</p>
    } else {
        return userId;
    }
}

export default GetUserId;