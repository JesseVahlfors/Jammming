import React from "react";

function Track(props) {
    return (
        <>
            <h3>{props.name}</h3>
            <p>{props.artist} | {props.album}</p>
        </>
    );
}

export default Track;