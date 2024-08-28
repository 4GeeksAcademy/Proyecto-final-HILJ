import React from "react";
import "../../styles/smallRouteCard.css";

const SmallRouteCard = ({ img, title}) => {
  return (
    <div className="smallRouteCard d-flex align-items-center p-3 mb-4">
      <img src={img} alt=""/>
      <h5 className="m-0 fw-bold">{title}</h5>
    </div>
  );
};

export default SmallRouteCard;
