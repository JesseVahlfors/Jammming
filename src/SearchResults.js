import React, { useState, useEffect } from "react";

//Each hard-coded array of track objects should contain a name, artist, album, and id property.
function SearchResults() {
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockSearchResults = [
            {
                name: "Kura Kura",
                artist: "Ado",
                album: "Kura Kura",
                id: "1"        
            },
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
            },
            {
                name: "KANATA HALUKA",
                artist: "RADWIMPS",
                album: "Spinning globe",
                id: "4"        
            },
            {
                name: "Bad example",
                artist: "takayan",
                album: "2019-2021",
                id: "5"        
            }
        
        ];

        setSearchData(mockSearchResults)
        setLoading(false);

    }, []);
    
    return { searchData, loading}
}

export default SearchResults;