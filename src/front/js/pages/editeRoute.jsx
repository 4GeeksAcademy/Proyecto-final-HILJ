import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { AddDay } from "../component/addDay.jsx";
import "../../styles/createRoute.css";
import EditFile from "../component/editRouteComp/editFile.jsx";


export const EditRoute = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.theid
  

  // Obtenemos el ID de la ruta a editar desde los parámetros de la URL

  
  useEffect(() => {
    if (id) {
      const loadRouteData = async () => {
        try {
          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/itineraries/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (!resp.ok) {
            throw new Error(data.msg || "Error loading itinerary data");
          }
          actions.setNewItineraryData(data);
          console.log(data.itinerary?.author_id, store.user?.id)
          if(data.itinerary?.author_id != store.user?.id) navigate('/')
        } catch (error) {
          console.error("Error loading itinerary:", error.message);
        }
      };
      loadRouteData();
    } else {
      console.error("Route ID is undefined.");
    }
  }, [id]);

  const handleDiscard = () => {
    navigate("/user");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      store.newItineraryData.title &&
      store.newItineraryData.description &&
      store.newItineraryData.city &&
      Object.keys(store.newItineraryData.itinerary).length > 0 &&
      store.newItineraryData.images.img.length > 0
    ) {
      try {
        const resp = await fetch(
          `${process.env.BACKEND_URL}/api/itineraries/${id}`,
          {
            method: "PUT", // Cambiamos el método a PUT para actualizar la ruta existente
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(store.newItineraryData),
          }
        );
        const data = await resp.json();

        if (!resp.ok) {
          const errorMsg = data.msg;
          throw new Error(errorMsg);
        }
        navigate("/user");
        window.location.reload();
        return { success: true, data: data }, 200;
      } catch (error) {
        console.error("Error updating itinerary:", error.message);
        return { success: false, msg: error.message };
      }
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="row w-100">
          <EditFile />
          <div className="col-12 col-md-5 my-2 mx-md-5">
            <AddDay />
            <div className="d-flex gap-3 w-75 mb-5 mx-auto mt-5">
              <button
                type="button"
                onClick={handleDiscard}
                className="btn btn-secondary discard rounded-pill flex-grow-1"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="btn btn-primary publish rounded-pill flex-grow-1"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};