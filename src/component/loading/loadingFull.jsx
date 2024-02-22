import React from "react";
import "./loading.css";
function LoadingFull(props) {
  return (
    <div
      className={`content-loader ` + (props.show ? `d-block` : `d-none`)}
    ></div>
  );
}
 
export default LoadingFull;
 