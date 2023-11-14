import { useState } from "react";
import { getAccessToken } from "./AccessToken/AccessToken";

export default function SearchBar (props) {
    const [searchData, setSearchData] = useState("");
    const [searchMessage, setSearchMessage] = useState("");

    const searchTracks = async (e) => {
        e.preventDefault();

         // Set loading to true when starting the search
        props.setLoading(true);

        const accessToken = getAccessToken();
        if(!searchData) {
            setSearchMessage("Please enter your search")
            props.setLoading(false);
            return;
        }
        
        if(!accessToken) {
            // Handle the case where there is no access token (user not logged in)
            setSearchMessage("User is not logged in.");
            setSearchData("")
            props.setLoading(false);
            return;
        }

        const trackSearchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchData)}&type=track`;

        try{
            setSearchMessage("")
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
                setSearchData("")
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
                {searchMessage && <p className="searchMessage">{searchMessage}</p>}
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