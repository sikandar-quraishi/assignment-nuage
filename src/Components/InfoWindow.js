/*jshint esversion: 6 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InfoWindow = (props) => {
    const infoWindowStyle = {
      position: 'absolute',
      bottom: 20,
      left: '-100px',
      width: 200,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      "border-radius": 25,
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };
  
    return (
        
<div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
      <h3> {props.content.Name} </h3>
      <img alt="FoodTruckIcon" src={props.content.ImgSrc} width="100" height="100" />

      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'black' }}>
          <hr/>
          <a href={props.content.AddressLink} target="_blank" rel="noopener noreferrer">{props.content.Address}</a>
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {props.content.Hours}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {'$'.repeat(props.content.Price)}
      </div>
    </div>
  );
};

  export default InfoWindow;
