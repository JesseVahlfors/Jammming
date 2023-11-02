import { useState, useEffect } from "react";
import { getAccessToken } from "./AccessToken";


function PlaylistSave({ onUserIdReceived, playlistName, playlistUris }) {
    const [userId, setUserId] = useState("");
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
                    })
                    .catch((error) => {
                        console.error("Network error", error);
                    })                
            }
        }, [onUserIdReceived]);
    const handleSaveClick = async (accessToken, userId, playlistName, playlistUris) => {
        /* if(!userId) {
            setError("User ID is not available yet. Please wait.")
        } */
        const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
        const headers = {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
        if(userId) {
            try{
                console.log(userId)
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
                    await addTracksToPlaylist(accessToken, playlistId, playlistUris);
                    return playlistId;
                } else {
                    console.error("failed to create the playlist:", response.statusText);
                    return null;
                }
            } catch(error) {
                console.error("network error:", error);
                return null;
            }
        } else {
            console.error("User ID is not available yet. Please wait.")
        }
    }

    const addTracksToPlaylist = async (accessToken, playlistId, playlistUris) => {
        const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const headers = {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
        try{
            const response = await fetch(addTracksUrl, {
                method: "POST",
                headers,
                body:  JSON.stringify({
                    uris: playlistUris,
                }), 
            });

            if(response.ok) {
                console.log("Tracks added tot he playlist successfully.");
            } else {
                console.error("Failed to add tracks to the playlist", response.statusText);
            }
        } catch(error) {
            console.error("network error:", error)
        }
    }

    return (
        <>
            {userId && <button onClick={handleSaveClick}>Save to Spotify</button>}
        </>
    )
}

export default PlaylistSave;