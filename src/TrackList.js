/*Implement Track Listing in The Component Tree
When a user requests data from Spotify, the JSON response will contain a set of song tracks. Your Jammming web app should display the song name, artist, and album for each track in the results list.

Implement this by creating a unidirectional data flow from your root component. The root component should pass down the search results to a child component that will return each individual track to be rendered.

Since the Spotify API is not currently set up to be called, you may hard-code an array of track objects to be passed down for now.

Things to keep in mind:

Each hard-coded array of track objects should contain a name, artist, album, and id property.
Consider using state to store information such as your search results array, allowing you to update the array in response to user inputs and other events.
Use JavaScript’s map() method to iterate over arrays and render multiple components dynamically.
When returning the list of tracks, make sure to set a unique key attribute for each track. This will help React efficiently update the DOM when changes occur.*/
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import styles from "./TrackList.module.css"
//Each hard-coded array of track objects should contain a name, artist, album, and id property.


//When a user requests data from Spotify, the JSON response will contain a set of song tracks.

//Your Jammming web app should display the song name, artist, and album for each track in the results list.

function TrackList() {
    const [results, setResults] = useState(SearchResults)
    return (
        <>
            {results.map((result, i) => (
            <div key={i} className="track">
                <h3>Name: {result.name}</h3>
                <h4>Artist: {result.artist}</h4>
                <h4>Album: {result.album}</h4>
            </div>
            ))}
        </>
    )
}

export default TrackList