import Track from "../Track/Track";
import './Playlist.css'

function Playlist(props) {  
    return (
        <div className="playlist">
            {props.playlist.map((track) => (
            <div key={track.id} className="playlistTrack">
                <Track 
                name={track.name} 
                artist={track.artists[0].name} 
                album={track.album.name} 
                image={track.album.images[1].url}
                preview={track.preview_url} />
                <button onClick={(event) => props.onRemoveFromPlaylist(track, event)} className="removeButton">X</button>
            </div>
            ))}
        </div>
    )
}

export default Playlist