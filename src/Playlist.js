import React from "react";


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
                <p>{track.artists[0].name} | {track.album.name}</p>
                </div>
                <button onClick={() => props.onRemoveFromPlaylist(track)} className="removeButton">X</button>
            </div>
            ))}
        </>
    )
}

export default Playlist