import React, { useState } from "react";
import TrackList from "./TrackList";

/* Your Jammming web app should allow the user to customize their playlist title and tracks.
When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. 
This data flow should pass down the playlist name and tracks. */
const mockPlaylist = [
{
    name: "PUPPET SHOW",
    artist: "XG",
    album: "NEW DNA",
    id: "2"        
},
{
    name: "OTONABLUE",
    artist: "ATARASHII GAKKO!",
    album: "ICHIJIKIKOKU",
    id: "3"        
}
]

function Playlist() {
    const [playlistName, setPlaylistName] = useState("Gacha Pop playlist")
    const [playlistTracks, setPlaylistTracks] = useState(mockPlaylist)
    return (
        <>
            <h2>{playlistName}</h2>
            {playlistTracks.map((result, i) => (
            <div key={i} >
                <h3>Name: {result.name}</h3>
                <h4>Artist: {result.artist}</h4>
                <h4>Album: {result.album}</h4>
            </div>
            ))}
        </>
    )
}

export default Playlist