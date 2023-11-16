import React, { useEffect, useRef, useState } from "react";
import './Track.css'

function Track(props) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [playError, setPlayError] = useState(false)

    const handlePlay = (event) => {
        event.preventDefault();

        if (isPlaying) {
            audioRef.current.pause();
        } else {
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

    // Pause the audio when the component unmounts
    useEffect(() => {
        return () => {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false)
                setPlayError(false)
            }
        };
    }, [isPlaying]);

    return (
        <div className="track">
            <img src={props.image} alt={props.album} className="image"/>
            <div className="trackText">
                <h3>{props.name}</h3>
                <p>{props.artist} | {props.album}</p>
                {playError ? <p>Preview Unavailable</p> : 
                <button onClick={(event) => handlePlay(event)}>
                    {isPlaying ? "Pause" : "Play Preview" } 
                </button>}
                <audio ref={audioRef} src={props.preview} type="audio/mp3" />
            </div>
        </div>
    );
}

export default Track;