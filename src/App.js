import React, { useState, useEffect } from "react";
import SimpleMap from "./Components/SimpleMap";
import ListedTrucks from "./Components/ListedTrucks";
// import FindMeBtn from "./Components/FindMeBtn";


const App = () => {
  const [state, setState] = useState({
    lat: 30.237247,
    lng: -81.519488,
    zoom: null,
    centered: false,
  });
  const [realData, setRealData] = useState([]);

  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setState({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //         zoom: 14,
  //         centered: !state.centered,
  //       });
  //     },
  //     (error) => console.log(error)
  //   );
  // };

  useEffect(() => {
    if (document.querySelector(".loading")) {
      setTimeout(() => {
        document.querySelector(".loading").outerHTML = "";
      }, 1500);
    }

    getAllData()
  });

  const getAllData = () =>{
    fetch("http://localhost:5000/trucks").then((result) => {
      result.json().then((resp) => {
        setRealData(resp);
      });
    });
  }

  // console.log("Real Data:", realData);

  return (
    <div>
      {/* <FindMeBtn getLocation={getLocation} /> */}
      <SimpleMap
        CurrentZoom={state.zoom}
        CurrentLocation={state}
        Data={realData}
      />
      <ListedTrucks Data={realData} />
    </div>
  );
};

export default App;
