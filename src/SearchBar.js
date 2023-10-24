import { useState } from "react";
import { getAccessToken } from "./AccessToken";

export default function SearchBar (props) {
    const [searchData, setSearchData] = useState("")

    const searchTracks = async (e) => {
        e.preventDefault();

         // Set loading to true when starting the search
        props.setLoading(true);

        const accessToken = getAccessToken();
        
        if(!accessToken) {
            // Handle the case where there is no access token (user not logged in)
            console.log("User is not logged in.");
            return;
        }

        const trackSearchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchData)}&type=track`;

        try{
            const response = await fetch(trackSearchUrl, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const tracks = data.tracks.items;
                props.setSearchData(tracks);
                props.setLoading(false);
                console.log(tracks)
            } else {
                console.error("failed to fetch tracks:", response.statusText);
                props.setLoading(false);
            }
        } catch(error) {
            console.error("Network error:", error);
            props.setLoading(false)
        }
    };
    
    return (
        <>
            <form onSubmit={searchTracks} className='searchbar'>
                <input
                 type='text'
                 value={searchData}
                 onChange={e => setSearchData(e.target.value)}
                 ></input>
                <button type='submit'>Search</button>
            </form>    
        </>
    )
}