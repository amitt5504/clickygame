import React from "react";
import "./style.css";

function Score(props) {
    return <div className="score">{props.children}</div>;
}

export default Score;