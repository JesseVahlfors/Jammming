import addTracksToPlaylist from "./AddTracksToPlaylist"
import { useState } from "react";

const CreatePlaylist = ({ accessToken, userId, playlist }) => {
    /*   if(!userId) {
        setError("User ID is not available yet. Please wait.")
    }   */
    const [playlistName, setPlaylistName] = useState("");
    const [playlistUris, setPlaylistUris] = useState([]);   
    const handlePlaylistSubmit = async () => {
        try {
            const uris = playlist.map((track) => track.uri);
            /* console.log(`Playlist name: ${playlistName}`);
            console.log(uris);
            console.log("user id:" + userId) */
   
            const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
            const headers = {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            
            }
        
            const response = await fetch(playlistUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: playlistName,
                    description: "Made with Jammming",
                    public: true
                }),
            });

            if(response.ok) {
                const data = await response.json();
                const playlistId = data.id;
                await addTracksToPlaylist(accessToken, playlistId, uris);
            } else {
                const errorMessage = await response.text(); // Get the error message from the response body
                console.error("Failed to create the playlist:", response.statusText, errorMessage);
            }
        } catch(error) {
            console.error("Network error", error);
        };
    }
    
    return (
        <>
            <form onSubmit={handlePlaylistSubmit}>
                <input
                type="text"
                placeholder="Name your playlist"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                />
                <button type="submit">Save to Spotify</button>
            </form>
        </>
    );
};

export default CreatePlaylist;