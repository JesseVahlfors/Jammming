import Track from "../Track/Track";

function Playlist(props) {
    
    return (
        <>
            {props.playlist.map((track) => (
            <div key={track.id} className="playlistTrack">
                <Track name={track.name} artist={track.artists[0].name} album={track.album.name}  image={track.album.images[1].url}/>
                <button onClick={() => props.onRemoveFromPlaylist(track)} className="removeButton">X</button>
            </div>
            ))}
        </>
    )
}

export default Playlist