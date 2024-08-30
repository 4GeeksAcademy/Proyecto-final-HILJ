import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.css";
import { RouteCard } from "../component/searchRouteCard.jsx";
import { Navbarsearch } from "../component/navbar-search.jsx";
import { LoginRegister } from "../component/registerModal.jsx";
import { useLocation } from "react-router-dom";


export const Search = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const [itineraries, setItineraries] = useState(location.state?.itineraries || []);

  useEffect(() => {
    setItineraries(store.itineraries);
  }, [store.itineraries]);

  return (
    <main>
      {/* <Navbarsearch /> */}
      <LoginRegister />
      {itineraries.length > 0 ? (
        <h6 className="mt-5 mb-3 founded">
          Se {itineraries.length == 1 ? "ha" : "han"} encontrado{" "}
          <b>{itineraries.length}</b>{" "}
          {itineraries.length == 1 ? "itinerario:" : "itinerarios:"}
        </h6>
      ) : (
        <h6 className="mt-5 mb-3 founded">
          Se han encontrado <b>0</b> itinerarios:
        </h6>
      )}
      <div className="row justify-content-center mb-4 gx-0 p-4">
        {itineraries && itineraries.length > 0 ? (
          itineraries.map((itinerary, index) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4 gx-3"
              key={index}
            >
              <RouteCard
                id={itinerary.id}
                title={itinerary.title}
                img={itinerary.images.img[0]}
                desc={itinerary.description}
                score={itinerary.score}
              />
            </div>
          ))
        ) : (
          <h1>No se ha encontrado ninguna ruta.</h1>
        )}
      </div>
    </main>
  );
};
