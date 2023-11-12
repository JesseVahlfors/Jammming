import React, { useEffect, useState } from 'react';
import './App.css';
import TrackList from '../Tracklist/TrackList';
import background from "../img/HeadphonesGirl.png"
import { authorizationUrl } from '../Authorization';
import { clearURLParameters, getAccessToken, setAccessToken } from '../AccessToken';
import SearchBar from '../SearchBar';
import GetUserId from '../GetUserId';
import CreatePlaylist from '../CreatePlaylist';

function App() {
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(getAccessToken());

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const urlParams = new URLSearchParams(hash.replace("#", "?"));
      const newToken = urlParams.get('access_token');
      const expiresIn = urlParams.get('expires_in')
      if (newToken) {
        // Store the token in localStorage
        window.localStorage.setItem("token", newToken);
  
        // Set the token in the component's state
        setAccessToken(newToken, expiresIn);
        setToken(newToken)
      }
    }
  }, [])

  const [playlist, setPlaylist] = useState([]);
  const handleAddToPlaylist = (track) => {
    const isInPlaylist = playlist.some((t) => t.id === track.id);
    if(!isInPlaylist) {setPlaylist([...playlist, track])}; 
  };

  const handleRemoveFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter((t) => t.id !== track.id);
    setPlaylist(updatedPlaylist);
  }

  const [userId, setUserId] = useState("")
  const handleUserIdReceived = (id) => {
    setUserId(id)
  }

  const handleOnSuccess = () => {
    setPlaylist([])
  }
 
  const logout = () => {
    setAccessToken(null, 0); // Clear the token
    window.localStorage.removeItem("token");
    setToken(null);
    clearURLParameters()
  };

  return (
    <div className="App" >
      <header className="App-header" >       
        {token ? (
          <div className='loggedIn'>
            <h4>Logged in: <GetUserId onUserIdReceived={handleUserIdReceived} /></h4>
            <h1>Ja<span>mmm</span>ing</h1>
            <button onClick={logout}>Logout</button>
          </div>
        ):(
          <div className='loggedOut'>
            <h1>Ja<span>mmm</span>ing</h1> 
            <a href={authorizationUrl}>Login to Spotify</a>
          </div>
        )}
      </header>
      <main className='App-container'>
        <figure className='image-container'>
          <img src={background} alt='Girl with headphones' />
        </figure> 
        <section className='section'>
          <SearchBar setSearchData={setSearchData} setLoading={setLoading} />
          <div className='lists-container'>
              {loading ? (
                <div className="tracklist">
                  <h2 style={{alignSelf:"center"}}>Loading...</h2>
                </div>
                
              ) : (
                <>
                  {token && (<TrackList tracks={searchData} onAddToPlaylist={handleAddToPlaylist}/>)}
                  {token && (
                  <CreatePlaylist
                    accessToken={token}
                    userId={userId}
                    playlist={playlist}
                    onRemoveFromPlaylist={handleRemoveFromPlaylist}
                    onSuccess={handleOnSuccess}
                  />
                  )}
                </>
              )}        
          </div> 
        </section>             
      </main>
      <footer>
        <h3>Made by <a href='https://github.com/JesseVahlfors'>Jesse Vahlfors</a> 2023</h3>
      </footer>  
    </div>    
  );
}

export default App;
