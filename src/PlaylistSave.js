import { useState, useEffect } from "react";
import { getAccessToken } from "./AccessToken";


function PlaylistSave({ onUserIdReceived }) {
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
                            onUserIdReceived(data.id)
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
    }, [onUserIdReceived]);

    const savePlaylist = async (accessToken, userId, playlistName, trackUris) => {
        const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
        const headers = {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }

        if(accessToken) {
            try{
                const response = await fetch(playlistUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        name: playlistName,
                        description: "Made with Jammming",
                        public: false
                    }),
                });

                if(response.ok) {
                    const data = await response.json();
                    const playlistId = data.id;
                    await addTracksToPlaylist(accessToken, playlistId, trackUris);
                    return playlistId;
                } else {
                    console.error("failed to create the playlist:", response.statusText);
                    return null;
                }
            } catch {
                console.error("network error:", error);
                return null;
            }
        };

    }

    return (
        <>
            {getAccessToken() && <button>Save to Spotify</button>}
        </>
    )
}

export default PlaylistSave;