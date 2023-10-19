import React, { useState } from "react";

/* Your Jammming web app should allow the user to customize their playlist title and tracks.
When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. 
This data flow should pass down the playlist name and tracks. */


function Playlist({ playlist, onRemoveFromPlaylist }) {
    const [playlistName, setPlaylistName] = useState("Gacha Pop playlist")

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    };

    const handleSavePlaylist = () => {
        console.log("Playlist Name: " + playlistName)

        setPlaylistName("")
    };

    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <input
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={handleNameChange} 
            />
            <button onClick={handleSavePlaylist}>Save To Spotify</button>
            {playlist.map((track, i) => (
            <div key={i} >
                <h3>Name: {track.name}</h3>
                <p>Artist: {track.artist}</p>
                <p>Album: {track.album}</p>
                <button onClick={() => onRemoveFromPlaylist(track)}>Remove from playlist</button>
            </div>
            ))}
        </div>
    )
}

export default Playlist