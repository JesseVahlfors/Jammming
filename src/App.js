import React, { useEffect, useState } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import TrackList from './TrackList';
import background from "./img/HeadphonesGirl.png"
import { authorizationUrl } from './Authorization';
import { clearURLParameters, getAccessToken, setAccessToken } from './AccessToken';

function App() {
  const { searchData, loading } = SearchResults();
  const [playlist, setPlaylist] = useState([]);
 
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token");

    if (hash) {
      const urlParams = new URLSearchParams(hash.replace("#", "?"));
      const newToken = urlParams.get('access_token');
      const expiresIn = urlParams.get('expires_in')
  
      if (newToken) {
        // Store the token in localStorage
        window.localStorage.setItem("token", newToken);
  
        // Set the token in the component's state
        setAccessToken(newToken, expiresIn);
      }
    }
  }, [])

  const handleAddToPlaylist = (track) => {
    const isInPlaylist = playlist.some((t) => t.id === track.id);
    if(!isInPlaylist) {setPlaylist([...playlist, track])}; 
  };

  const handleRemoveFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter((t) => t.id !== track.id);
    setPlaylist(updatedPlaylist);
  }
  
  const handleSavePlaylist = (playlistName) => {
    const playlistUris = playlist.map((track) => track.uri);
    console.log(`Playlist name: ${playlistName}`);
    console.log(playlistUris);
    setPlaylist([]);
    setPlaylistName("");
  }
  
  const [playlistName, setPlaylistName] = useState("");
  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const logout = () => {
    setAccessToken(null, 0); // Clear the token
    window.localStorage.removeItem("token")
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`}}>
      <header className="App-header" >
        <h1>Ja<span>mmm</span>ing</h1>
        {getAccessToken() ? (
          <button onClick={logout}>Logout</button>
        ):( 
          <a href={authorizationUrl}>Login to Spotify</a>
        )}
      </header>
      <div>
        <div className='searchbar'>
          <input type='text'></input>
          <button>Search</button>
        </div>
        <div className='lists-container'>
            {loading ? (
              <p>Loading...</p>
            ) : (
                <TrackList tracks={searchData} onAddToPlaylist={handleAddToPlaylist}/>
            )}
            <div className='playlist'>
              <input
              type="text"
              placeholder="Name your playlist"
              value={playlistName}
              onChange={handleNameChange} 
              />
              <Playlist 
              playlist={playlist}
              playlistName={playlistName}
              onRemoveFromPlaylist={handleRemoveFromPlaylist}
              onSavePlaylist={handleSavePlaylist}
              />
            </div>   
        </div>              
      </div>
      <footer>
        <h3>Made by Jesse Vahlfors 2023</h3>
      </footer>  
    </div>    
  );
}

export default App;
