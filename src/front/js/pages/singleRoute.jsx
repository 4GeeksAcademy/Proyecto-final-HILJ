import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { ItineraryCarrusel } from "../component/itineraryCarrusel.jsx";
import RouteDescription from "../component/routeDescription.jsx";
import AccordionContainer from "../component/accordionContent.jsx";

export const SingleRoute = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  // Log the params to see what ID is being passed
  console.log("Params:", params);

  // Attempt to find the itinerary
  const getItinerary = store.itineraries.find(itinerary => itinerary.id === parseInt(params.theid));

  // Log the result of the find operation
  console.log("Found Itinerary:", getItinerary);

  if (!getItinerary) {
    // Log an error if the itinerary is not found
    console.error("Itinerary not found for ID:", params.theid);
    return <div>Itinerario no encontrado</div>;
  }

  const itinerary = getItinerary;
  const itineraryKeys = Object.keys(itinerary.itinerary);

  // Log the keys of the itinerary to ensure they are correct
  console.log("Itinerary Keys:", itineraryKeys);

  return (
    <div className="row w-100 justify-content-center ">
      <div className="col-5 my-5 mx-auto">
        {/* Log the images being passed to the carousel */}
        <ItineraryCarrusel images={itinerary.images.img} />
        <RouteDescription data={itinerary} />
      </div>
      <div className="col-5 my-5 mx-5">
        <div className="d-flex flex-column align-items-center">
          {itineraryKeys.map((key, index) => (
            <div className="mx-auto w-100" key={index}>
              <AccordionContainer id={index} title={key}>
                <ul>
                  {itinerary.itinerary[key].map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </AccordionContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
