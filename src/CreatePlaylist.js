import addTracksToPlaylist from "./AddTracksToPlaylist"
import Playlist from "./Playlist/Playlist";
import { useState } from "react";

const CreatePlaylist = ({ accessToken, userId, playlist, onRemoveFromPlaylist, onSuccess }) => {
    const [playlistName, setPlaylistName] = useState("Name Me!");
    const [successMessage, setSuccessMessage] = useState("") 

    const clearSuccessMessage = () => {
        setTimeout(()=> {
            setSuccessMessage("")
        }, 10000)
    }

    const handlePlaylistSubmit = async (event) => {
        event.preventDefault()
        if(!playlistName){ 
            setSuccessMessage("Please name your playlist!")
            clearSuccessMessage()
            return;
        }
        if(playlist.length < 1) {
            setSuccessMessage("Please add some tracks!")
            clearSuccessMessage()
            return;
        }
        setSuccessMessage("Saving...");
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
                    public: false
                }),
            });

            if(response.ok) {
                const data = await response.json();
                const playlistId = data.id;
                await addTracksToPlaylist(accessToken, playlistId, uris);
                setSuccessMessage("Playlist created!");
                clearSuccessMessage();
                onSuccess();
                setPlaylistName("Name Me!");
            } else {
                const errorMessage = await response.text(); // Get the error message from the response body
                console.error("Failed to create the playlist:", response.statusText, errorMessage);
                setSuccessMessage("Something went wrong... try again.")
                clearSuccessMessage();
            }
        } catch(error) {
            console.error("Network error", error);
            clearSuccessMessage();
        };
    }
    
    
    return (
        <>
            <form className='playlistForm' onSubmit={handlePlaylistSubmit} data-testid="create-playlist">
                <input
                type="text"
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