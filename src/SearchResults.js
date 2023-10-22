import { useState, useEffect } from "react";

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
                id: "1",
                uri:"123"        
            },
            {
                name: "PUPPET SHOW",
                artist: "XG",
                album: "NEW DNA",
                id: "2",
                uri: "456"        
            },
            {
                name: "OTONABLUE",
                artist: "ATARASHII GAKKO!",
                album: "ICHIJIKIKOKU",
                id: "3",
                uri: "789"        
            },
            {
                name: "KANATA HALUKA",
                artist: "RADWIMPS",
                album: "Spinning globe",
                id: "4",
                uri: "321"        
            },
            {
                name: "Bad example",
                artist: "takayan",
                album: "2019-2021",
                id: "5" ,
                uri: "654"       
            },
            {
                name: "Another Track",
                artist: "Another Artist",
                album: "Another Album",
                id: "6",
                uri: "987"
              },
              {
                name: "Cool Song",
                artist: "Great Artist",
                album: "Awesome Album",
                id: "7",
                uri: "6543"
              },
              {
                name: "Rock Anthem",
                artist: "Rock Band",
                album: "Greatest Hits",
                id: "8",
                uri: "1234"
              },
              {
                name: "Chill Vibes",
                artist: "Relaxation Station",
                album: "Soothing Sounds",
                id: "9",
                uri: "5678"
              },
              {
                name: "Dance Groove",
                artist: "Party People",
                album: "Club Hits",
                id: "10",
                uri: "333"
              },
              {
                name: "Summer Breeze",
                artist: "Sunny Days",
                album: "Beach Party",
                id: "11",
                uri: "4444"
              },
              {
                name: "Epic Journey",
                artist: "Adventure Seekers",
                album: "Exploration",
                id: "12",
                uri: "1111"
              },
              {
                name: "Jazz Grooves",
                artist: "Smooth Jazz Ensemble",
                album: "Late Night Jazz",
                id: "13",
                uri: "8888"
              },
              {
                name: "Funky Town",
                artist: "Groove Masters",
                album: "Funky Beats",
                id: "14",
                uri: "9999"
              },
              {
                name: "Classical Serenade",
                artist: "Orchestra Symphony",
                album: "Classical Masterpieces",
                id: "15",
                uri: "7777"
              },
              {
                name: "Country Roads",
                artist: "Nashville Stars",
                album: "Country Hits",
                id: "16",
                uri: "5555"
              },
              {
                name: "Reggae Vibe",
                artist: "Island Rhythms",
                album: "Reggae Grooves",
                id: "17",
                uri: "6666"
              },
              {
                name: "Electro Beats",
                artist: "EDM Wizards",
                album: "Electronica Explosion",
                id: "18",
                uri: "3333"
              },
              {
                name: "Acoustic Melody",
                artist: "Unplugged Sessions",
                album: "Acoustic Soundscapes",
                id: "19",
                uri: "2222"
              },
              {
                name: "Rap Rhymes",
                artist: "Hip-Hop Legends",
                album: "Rap Anthems",
                id: "20",
                uri: "777"
              }
        
        ];

        setSearchData(mockSearchResults)
        setLoading(false);

    }, []);
    
    return { searchData, loading}
}

export default SearchResults;