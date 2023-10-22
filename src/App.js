
import React, { useState } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import TrackList from './TrackList';

function App() {
  const { searchData, loading } = SearchResults();
  const [playlist, setPlaylist] = useState([]);

  const handleAddToPlaylist = (track) => {
    const isInPlaylist = playlist.some((t) => t.id === track.id);
    if(!isInPlaylist) {setPlaylist([...playlist, track])}; 
  };

  const handleRemoveFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter((t) => t.id !== track.id);
    setPlaylist(updatedPlaylist);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      <div className='App-container'>
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
            <Playlist playlist={playlist} onRemoveFromPlaylist={handleRemoveFromPlaylist}/>   
        </div>                
      </div>
    </div>    
  );
}

export default App;
