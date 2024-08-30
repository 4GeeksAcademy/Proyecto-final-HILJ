import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import Searchbar from "./searchbar.jsx";
import BlueButton from "./buttons/blueButton.jsx";
import { Context } from "../store/appContext.js";
import DropdownButton from "./buttons/dropdownButton.jsx";
import RatingModal from "../component/ratingModal.jsx";

export const Navbarsearch = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-light navbar-shadow py-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="order-xs-1 custom-link d-flex align-items-center"
        >
          <span className="navbar-brand mb-0 h1 custom-font">ShareTrips</span>
        </Link>
        <div className="d-flex align-items-center searchbar">
          <Searchbar />
        </div>
        <div className="ml-auto d-flex align-items-center">
          {localStorage.getItem("token") || store.token ? (
            <DropdownButton
              icon={<i className="bi bi-person-circle"></i>}
              buttonName={"Mi perfil"}
            />
          ) : (
            <BlueButton
              icon={<i className="bi bi-person-circle"></i>}
              buttonName={"Iniciar sesión"}
              toggle={"modal"}
              target={"#loginModal"}
            />
          )}
          <button
            className="custom-button rounded-pill py-2 px-3"
            data-bs-toggle="modal"
            data-bs-target="#ratingModal"
          >
            <i className="bi bi-person-circle"></i> Prueba Modal
          </button>
          <RatingModal />
        </div>
      </div>
    </nav>
  );
};
