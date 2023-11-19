import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css"

function TrackList({ tracks, onAddToPlaylist }) {
    return (
        <div className="tracklist">
            <h2>Results</h2>
            {tracks.map((track) => (
                <div key={track.id} className="tracklist-container">
                    <Track 
                    trackId={track.id} 
                    name={track.name} 
                    artist={track.artists[0].name} 
                    album={track.album.name}  
                    image={track.album.images[1].url}
                    preview={track.preview_url} />
                    <button onClick={() => onAddToPlaylist(track)} >Add</button>
                </div>
            ))}
        </div>
    );
}

export default TrackList