import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoWindow from "./InfoWindow";
import { useToggle } from "@availity/hooks";

import "../index.css";

const FoodTruckmarker = props => {

  const [isOpen, toggleOpen] = useToggle();


  const onMarkerClick = (index) => {
    console.log("Marker Clicked");
    toggleOpen(!isOpen);
  };


  return (
    <React.Fragment >
      {isOpen && <InfoWindow content={props.result} />}
      <img
        onClick={onMarkerClick}
        className="FoodTruckmarker"
        content={props.result.Name}
        src="http://wherethatfoodtruck.com/graphics/default/logo.png"
        height="42"
        width="35"
        lat={props.Lat}
        lng={props.Lng}
        text={props.result.Name}
        alt="FoodTruck Markers"
      />
    </React.Fragment>
  );
};

export default FoodTruckmarker;
