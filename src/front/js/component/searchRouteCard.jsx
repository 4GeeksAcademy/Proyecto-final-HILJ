import React, { useContext } from "react";
import "../../styles/route_card.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const RouteCard = ({ id, title, img, desc, score }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const validateToken = async (e) => {
    e.preventDefault(); // Previene la navegación predeterminada del enlace

    const token = localStorage.getItem('token');
    const isValid = await actions.validateToken(token);

    if (!isValid) {
      navigate('/');
      setTimeout(() => {
        alert('Debes estar registrado para ver la ruta.');
      }, 100);
    } else {
      navigate(`/route/${id}`); 
    }
  };

  return (
      <div
        className="route-card card mx-auto border-0 d-flex justify-content-center"
        onClick={validateToken}
      >
        <div className="d-flex flex-column flex-md-row g-0 px-4 py-3">
          <div className="col-md-4 m-0 route-img">
            <img
              src={img}
              className="imgCard rounded-4 my-auto"
              alt="Imagen de ruta"
            />
          </div>
          <div className="col-md-8 col-12 ">
            <div className="routeCard card-body py-0" >
              <div className="d-flex card-top">
                <h5 className="card-title me-auto">{title}</h5>
                <p>Score: {score}</p>
              </div>
              <p className="card-text">{desc}</p>
            </div>
          </div>
        </div>
      </div>
  );
};
