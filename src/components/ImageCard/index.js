import React from "react";
import "./style.css";


function ImageCard(props) {
  return (
  <div onClick={() => props.setClicked(props.id)} className="card">
			<div className="img-container">
				<img alt={props.name} src={props.image} />
			</div>
      <div className="content">
        <strong>{props.name}</strong> 
      </div>
	</div>
);  
} 

export default ImageCard;
