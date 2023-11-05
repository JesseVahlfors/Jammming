
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