import React, {createContext, useContext, useState} from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState(null);

    const playAudio = (audioRef, trackId) => {
        if (currentAudio && currentAudio !== audioRef) {
            currentAudio.pause();
        }
        setCurrentAudio(audioRef);
        setCurrentTrackId(trackId);
    };

    return (
        <AudioContext.Provider value={{ playAudio, currentTrackId }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};