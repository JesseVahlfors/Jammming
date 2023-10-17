import './App.css';
import TrackList from './TrackList';
import Playlist from './Playlist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <body className='App-container'>
        <button>Search</button>
        <div className='lists-container'>
          <div className="tracklist">
            <h2>Results</h2> 
            <TrackList /> 
          </div>     
          <div className='playlist'>
            <Playlist />
          </div>
        </div> 
        <button>Save To Spotify</button>        
      </body>
    </div>    
  );
}

export default App;
