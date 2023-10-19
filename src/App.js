import './App.css';
import SearchResults from './SearchResults';
import Track from './Track';

function App() {
  const { searchData, loading } = SearchResults();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <div className='App-container'>
        <input type='text' className='searchbar'></input>
        <button>Search</button>
        <div className='lists-container'>
          <div className="tracklist">
            <h2>Results</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {searchData.map((result) => (
                  <Track 
                    key={result.id}
                    name={result.name}
                    artist={result.artist}
                    album={result.album}  
                  />
                ))}
              </div>
            )}
          </div>     
          <div className='playlist'>
            <input type='text' className='playlistName' placeholder="Please name your playlist"></input>

            <button>Save To Spotify</button> 
          </div>
        </div>                
      </div>
    </div>    
  );
}

export default App;
