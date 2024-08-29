import React, { useContext, useState, useEffect } from "react";
import AccordionContainer from "./accordionContent.jsx";
import { DATA_LIST } from "./data/data.js";
import BlueButton from "./buttons/blueButton.jsx";
import { Context } from "../store/appContext.js";
import ActivityModal from "./activityModal.jsx";
import "../../styles/addDay.css"

export const AddDay = () => {
  const { store, actions } = useContext(Context);
  const itineraryDataKeys = Object.keys(store.newItineraryData.itinerary);

  const deleteDay = (e) => {
    actions.deleteDay(e);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Itinerario:</h2>
        <button
          className="btn btn-outline-primary rounded-pill"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#createDay"
        >
          <i className="bi bi-plus"></i> Añadir día
        </button>
      </div>
    <hr className="mt-0" />
      <div className="d-flex flex-column align-items-center">
        {itineraryDataKeys?.map((key, index) => (
          <div className="mx-auto w-100" key={index}>
            <AccordionContainer
              id={index}
              title={key}
              del={
                <i
                  key={key}
                  onClick={() => deleteDay(key)}
                  className="bi bi-trash3"
                ></i>
              }
            >
              <ul>
                {store.newItineraryData.itinerary[key].map(
                  (location, index) => (
                    <li key={index}>{location}</li>
                  )
                )}
              </ul>
            </AccordionContainer>
          </div>
        ))}
        {/* <BlueButton
          buttonName={"Añadir día"}
          // icon={<i
          //     className=" me-2 fa-solid fa-plus fa-lg"
          //     style={{ color: "white" }}
          // />}
          icon={<i className="bi bi-plus-lg"></i>}
          toggle={"modal"}
          target={"#createDay"}
          type={'button'}
        /> */}
      </div>
      <ActivityModal />
    </>
  );
};
