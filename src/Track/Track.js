import React from "react";
import './Track.css'

function Track(props) {
    return (
        <div className="track">
            <img src={props.image} alt={props.album} className="image"/>
            <div className="trackText">
                <h3>{props.name}</h3>
                <p>{props.artist} | {props.album}</p>
            </div>
        </div>
    );
}

export default Track;