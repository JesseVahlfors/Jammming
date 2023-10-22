import React, { useState } from "react";

/* Your Jammming web app should allow the user to customize their playlist title and tracks.
When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. 
This data flow should pass down the playlist name and tracks. */


function Playlist(props) {
    return (
        <>
            {props.playlist.map((track, i) => (
            <div key={i} className="playlistTrack">
                <div>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
                </div>
                <button onClick={() => props.onRemoveFromPlaylist(track)} className="removeButton">X</button>
            </div>
            ))}
            <button onClick={() => props.onSavePlaylist(props.playlistName)}  className="saveButton">
                Save To Spotify
            </button>
        </>
    )
}

export default Playlist