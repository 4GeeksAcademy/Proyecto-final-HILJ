import React, { useState, useCallback, useMemo, useContext, useEffect } from "react";
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
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
};

const center = {
  lat: 40.40984608562589,
  lng: -3.7383326434978748,
};

const libraries = ["places"];

export const AddDay = () => {
  const { store, actions } = useContext(Context);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [points, setPoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDayPoints, setCurrentDayPoints] = useState([]);
  const [modalDirectionsResponse, setModalDirectionsResponse] = useState(null);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

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

    actions.addDay(dayNumber, points);
    setPoints([]);
    setDirectionsResponse(null);
  };

  const deleteDay = (key) => {
    actions.deleteDay(key);
  };

  const openMapForDay = (dayPoints) => {
    setCurrentDayPoints(dayPoints);
    setIsModalOpen(true);
  };

  const openDescriptionModal = (dayKey) => {
    setSelectedDay(dayKey);
    setDescription(store.newItineraryData.itinerary[dayKey].description || "");
    setDescriptionModalOpen(true);
  };

  const handleDescriptionSave = () => {
    actions.updateDayDescription(selectedDay, description);
    setDescriptionModalOpen(false);
  };

  useEffect(() => {
    if (currentDayPoints.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: currentDayPoints[0],
          destination: currentDayPoints[currentDayPoints.length - 1],
          travelMode: "WALKING",
          waypoints: currentDayPoints.slice(1, -1).map((point) => ({ location: point })),
        },
        (result, status) => {
          if (status === "OK") {
            setModalDirectionsResponse(result);
          } else {
            console.error(`Error fetching route: ${result}`);
          }
        }
      );
    }
  }, [currentDayPoints]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className=" mt-md-5 ms-3 md-ms-0 h4 mb-0">Itinerario:</h2>
      </div>
      <hr className="mt-0 ms-3" />
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
                  className="bi bi-trash3 ms-3 text-danger"
                  style={{ cursor: 'pointer' }}
                ></i>
              }
            >
              <ul>
                {store.newItineraryData.itinerary[key].map((location, locIndex) => (
                  <li key={locIndex}>{location.address}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button
                  className="btn btn-outline-primary rounded-pill me-2"
                  type="button"
                  onClick={() => openMapForDay(store.newItineraryData.itinerary[key])}
                >
                  <i className="bi bi-map"></i> Ver mapa del día
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill"
                  type="button"
                  onClick={() => openDescriptionModal(key)}
                >
                  <i className="bi bi-pencil"></i> Añadir descripción
                </button>
              </div>
              {store.newItineraryData.itinerary[key].description && (
                <div className="mt-2">
                  <p><strong>Descripción:</strong> {store.newItineraryData.itinerary[key].description}</p>
                </div>
              )}
            </AccordionContainer>
          </div>
        ))}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyDGBwjZqOGj5IEsXnqztDFkBwXUrc_Bgyo" libraries={libraries}>
       <div className="map ms-3">
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
       </div>

        <div  className="ms-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceSelect}
            options={{
              componentRestrictions: { country: "es" },
            }}
          >
            <input
              className="addLocation form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Introduce una ubicación"
              
            />
          </Autocomplete>
          <button
            className="btn btn-outline-primary rounded-pill mb-2 col-md-3 "
            type="button"
            onClick={handleAddDay}
          >
            <i className="bi bi-plus"></i> Añadir día
          </button>

          <span className="deleteLocationButton">
            <RedButton type={"button"} buttonName={"Eliminar ubicación"} onclick={handleRemoveLastPoint} />
          </span>
        </div>

        {isModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="mapModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0 rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title" id="mapModalLabel">
                    Mapa del Día
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentDayPoints.length > 0 ? currentDayPoints[0] : center}
                    zoom={currentDayPoints.length > 0 ? 12 : 6}
                  >
                    {modalDirectionsResponse && (
                      <DirectionsRenderer
                        options={{ directions: modalDirectionsResponse }}
                      />
                    )}
                  </GoogleMap>
                </div>
              </div>
            </div>
          </div>
        )}

        {descriptionModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="descriptionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0 rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title" id="descriptionModalLabel">
                    Descripción del Día
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDescriptionModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escribe una descripción..."
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDescriptionSave}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </LoadScript>
    </>
  );
};
