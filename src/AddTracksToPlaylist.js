
const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const headers = {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    }
    try{
        const response = await fetch(addTracksUrl, {
            method: "POST",
            headers,
            body:  JSON.stringify({
                uris: uris,
            }), 
        });

        if(response.ok) {
            console.log("Tracks added to the playlist successfully.");
        } else {
            console.error("Failed to add tracks to the playlist", response.statusText);
        }
    } catch(error) {
        console.error("network error:", error)
    }
}

export default addTracksToPlaylist;