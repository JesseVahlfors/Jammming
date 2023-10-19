import React from "react";

function Track(props) {
    return (
        <>
            <h3>Name: {props.name}</h3>
            <p>Artist: {props.artist}</p>
            <p>Album: {props.album}</p>
        </>
    );
}

export default Track;