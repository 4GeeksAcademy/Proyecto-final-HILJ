import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UploadFile from "../component/uploadFile.jsx";
import Accordion from "../component/accordion.jsx";
import { AddDay } from "../component/addDay.jsx";
import ActivityModal from "../component/activityModal.jsx";
import "../../styles/createRoute.css"

export const CreateRoute = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

  const handleDiscard = () => {
    navigate('/user')
    window.location.reload();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      store.newItineraryData.title &&
      store.newItineraryData.description &&
      store.newItineraryData.city &&
      Object.keys(store.newItineraryData.itinerary).length > 0 &&
      store.newItineraryData.images.img.length > 0
    ){
      try {
        const resp = await fetch(process.env.BACKEND_URL + '/api/itineraries',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(store.newItineraryData)
        });
        const data = await resp.json();
        
        if (!resp.ok) {
          const errorMsg = data.msg
          throw new Error(errorMsg);
        }
        navigate('/user')
        return { success: true, data: data }, 200
      } catch (error) {
        console.error('Error creating itinerary:', error.message);
             return { success: false, msg: error.message };
      }
    };

  };
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="row w-100 justify-content-center ">
          <UploadFile />
          <div className="col-5 my-5 mx-5">
            {/* <div className="float-end"> */}
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
                Publicar
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </form>
    </>
  );
};