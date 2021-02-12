import React from "react";

const FindMeBtn = (props) => {
  return (
    <div>
      <button color="primary" onClick={props.getLocation}>
        <h3>Use My Location</h3>
      </button>
    </div>
  );
};

export default FindMeBtn;
