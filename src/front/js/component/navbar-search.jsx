import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import Searchbar from "./searchbar.jsx";
import BlueButton from "./buttons/blueButton.jsx";
import { Context } from "../store/appContext.js";
import DropdownButton from "./buttons/dropdownButton.jsx";

export const Navbarsearch = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.validateToken(localStorage.getItem('token'));
  }, []);

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
        </div>
      </div>
    </nav>
  );
};
