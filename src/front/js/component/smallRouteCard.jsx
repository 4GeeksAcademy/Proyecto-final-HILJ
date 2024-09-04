import React from "react";
import "../../styles/smallRouteCard.css";

const SmallRouteCard = ({ img, title }) => {
  const placeholderImage = "https://via.placeholder.com/150"; // Reemplaza con la URL de la imagen que quieras usar como placeholder

  return (
    <div className="smallRouteCard d-flex align-items-center p-3 mb-4">
      <img 
        className="smallroute" 
        src={img ? img : placeholderImage} 
        alt={title} 
        style={{ width: '150px', height: '150px', objectFit: 'cover' }} // Ajusta el estilo según tus necesidades
      />
      <h5 className="m-0 fw-bold ms-3">{title}</h5>
    </div>
  );
};

export default SmallRouteCard;
