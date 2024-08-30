import React, { useState, useCallback, useMemo, useContext } from "react";
import { Context } from "../store/appContext.js";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import AccordionContainer from "./accordionContent.jsx";

import "../../styles/addDay.css";
import RedButton from "../component/buttons/redButton.jsx";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "20px",  
  overflow: "hidden",    
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" 
};

const center = {
  lat: 40.40984608562589,
  lng: -3.7383326434978748,
};

const libraries = ["places"];

export const AddDay = () => {

  const { store, actions } = useContext(Context)
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [points, setPoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const itineraryDataKeys = Object.keys(store.newItineraryData.itinerary);

  const directionsServiceOptions = useMemo(
    () => ({
      origin: points[0],
      destination: points[points.length - 1],
      travelMode: "WALKING",
      waypoints: points.slice(1, -1).map((point) => ({ location: point })),
    }),
    [points]
  );

  const handlePlaceSelect = useCallback(() => {
    if (autocomplete !== null && autocomplete.getPlace) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPoint = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.name,
        };
        setPoints((prevPoints) => [...prevPoints, newPoint]);

       
        map.panTo(newPoint);
      }
    }
    setInputValue("");
  }, [autocomplete, map]);

  const handleAutocompleteLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const handleDirectionsCallback = useCallback((response) => {
    if (response !== null && response.status === "OK") {
      setDirectionsResponse(response);
    } else {
      console.error("Error fetching directions:", response);
    }
  }, []);

  const handleRemoveLastPoint = useCallback(() => {
    setPoints((prevPoints) => {
      const updatedPoints = prevPoints.slice(0, -1);
      if (updatedPoints.length < 2) {
        setDirectionsResponse(null);
      }
      return updatedPoints;
    });
  }, []);

  const handleAddDay = () => {
    const dayNumber = Object.keys(store.newItineraryData.itinerary).length + 1;
    if (points.length === 0) return; 

    const newDay = points.map(point => point.address);

    actions.addDay(dayNumber, points);

    setPoints([]);
    setDirectionsResponse(null);
    console.log(points)
  };

  const deleteDay = (key) => {
 
    actions.deleteDay(key)
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Itinerario:</h2>
        
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
                    <li key={index}>{location.address}</li>
                  )
                )}
              </ul>
            </AccordionContainer>
          </div>
        ))}




       
      </div>

      <LoadScript
        googleMapsApiKey="AIzaSyD2xZz7fZATEPYBmHAQ8BNTVNNwDiDAZcY"
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {points.map((point, index) => (
            <Marker key={index} position={point} />
          ))}

          {points.length >= 2 && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={handleDirectionsCallback}
            />
          )}

          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
            />
          )}
        </GoogleMap>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceSelect}
            options={{
              componentRestrictions: { country: "es" },
            }}
          >
            <input
            l className="form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Introduce una ubicación"
              style={{
                width: "400px",
                height: "40px",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            />
         </Autocomplete>
         <button
          className="btn btn-outline-primary rounded-pill my-1 w-25"
          type="button"
          onClick={handleAddDay} 
        >
          <i className="bi bi-plus"></i> Añadir día
        </button>

         <span className="w-25"> <RedButton type={"button"} buttonName={"Eliminar ubicación"} onclick={handleRemoveLastPoint}/></span>
        </div>
      </LoadScript>
    </>
  );
};
