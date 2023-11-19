import React, { useRef, useState } from "react";
import './Track.css'
import { useAudio } from "../Utilities/AudioContext";

function Track(props) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [playError, setPlayError] = useState(false)

    const { playAudio, currentTrackId } = useAudio();

    const handlePlay = (event) => {
        event.preventDefault();

        if (currentTrackId === props.trackId && isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false);
        } else {
            playAudio(audioRef.current, props.trackId);

            const playPromise = audioRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then(() =>{
                    setIsPlaying(true);
                }).catch((error) => {
                    setPlayError(true)
                    console.error('Error playing audio:', error);
                })
            }
        }
        setIsPlaying(!isPlaying);
    };


    return (
        <div className="track">
            <img src={props.image} alt={props.album} className="image"/>
            <div className="trackText">
                <h3>{props.name}</h3>
                <p>{props.artist} | {props.album}</p>
                {playError ? <p>Preview Unavailable</p> : 
                <button onClick={(event) => handlePlay(event)}>
                    {isPlaying && currentTrackId === props.trackId ? "Pause" : "Play Preview" } 
                </button>}
                <audio ref={audioRef} src={props.preview} type="audio/mp3" />
            </div>
        </div>
    );
}

export default Track;