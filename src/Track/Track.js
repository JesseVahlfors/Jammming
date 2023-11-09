import React from "react";
import "./Track.css"

function Track(props) {
    return (
        <div className="container">
            <img src={props.image} alt={props.album} className="image"/>
            <h3 className="name">{props.name}</h3>
            <p className="artist">{props.artist} | {props.album}</p>
        </div>
    );
}

export default Track;