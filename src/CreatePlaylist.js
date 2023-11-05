import addTracksToPlaylist from "./AddTracksToPlaylist"
import Playlist from "./Playlist";
import { useState } from "react";

const CreatePlaylist = ({ accessToken, userId, playlist, onRemoveFromPlaylist, onSuccess }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [successMessage, setSuccessMessage] = useState("") 

    const handlePlaylistSubmit = async () => {
        if(!playlistName){ 
            setSuccessMessage("Please name your playlist!")
            return;
        }
        if(playlist.length < 1) {
            setSuccessMessage("Please add some tracks!")
            return;
        }
        try {
            const uris = playlist.map((track) => track.uri);
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
                setSuccessMessage("Playlist created!")
                onSuccess();
                setPlaylistName("");
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
            <form className='playlist' onSubmit={handlePlaylistSubmit}>
                <input
                type="text"
                placeholder="Name your playlist"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                />
                <Playlist 
                playlist={playlist} 
                onRemoveFromPlaylist={onRemoveFromPlaylist}
                onSuccess={onSuccess}
                />
                <button type="submit" >Save to Spotify</button>
                {successMessage && <h3 style={{alignSelf:"center"}}>{successMessage}</h3>}
            </form>
        </>
    );
};

export default CreatePlaylist;