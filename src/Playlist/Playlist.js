import Track from "../Track/Track"
import "./Playlist.css"
function Playlist(props) {
    
    return (
        <>
            {props.playlist.map((track) => (
            <div key={track.id} className="playlistTrack">
                <button onClick={() => props.onRemoveFromPlaylist(track)} className="removeButton">Remove</button>
                <Track name={track.name} artist={track.artists[0].name} album={track.album.name}  image={track.album.images[1].url}/>
            </div>
            ))}
        </>
    )
}

export default Playlist