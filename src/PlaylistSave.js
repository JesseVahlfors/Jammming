import react, { useState, useEffect } from "react";
import { getAccessToken } from "./AccessToken";


function PlaylistSave() {
    const [userId, setUserId] = useState("");
        useEffect(()=> {
            const getId = async () => {
                const accessToken = getAccessToken();

                if(accessToken) {
                    try{
                        const response = await fetch("https://api.spotify.com/v1/me", {
                            headers: {
                                authorization: `Bearer ${accessToken}`,
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setUserId(data.id);
                            //console.log(data.id)   //to check if i get the id string
                        } else {
                            console.error("failed to fetch ID:", response.statusText);
                        }
                    } catch(error) {
                        console.error("Network error" , error);
                    }
                }    
            };

        getId();
    }, []);

    return (
        <>
            {getAccessToken() ? (<h4>User: {userId}</h4>) : (<></>)}
        </>
    )
}

export default PlaylistSave;