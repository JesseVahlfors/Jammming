
import React, { useState } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import TrackList from './TrackList';

function App() {
  const { searchData, loading } = SearchResults();
  const [playlist, setPlaylist] = useState([]);

  const handleAddToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
  };

  const handleRemoveFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter((t) => t.id !== track.id);
    setPlaylist(updatedPlaylist);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <div className='App-container'>
        <input type='text' className='searchbar'></input>
        <button>Search</button>
        <div className='lists-container'>
            {loading ? (
              <p>Loading...</p>
            ) : (
                <TrackList tracks={searchData} on onAddToPlaylist={handleAddToPlaylist}/>
            )}
            <Playlist playlist={playlist} onRemoveFromPlaylist={handleRemoveFromPlaylist}/>   
        </div>                
      </div>
    </div>    
  );
}

export default App;
