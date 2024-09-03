import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ItineraryCarrusel } from "../component/itineraryCarrusel.jsx";
import RouteDescription from "../component/routeDescription.jsx";
import AccordionContainer from "../component/accordionContent.jsx";
import CommentsSection from "../component/commentsSection.jsx";
import FollowCard from "../component/followCard.jsx";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 40.40984608562589,
  lng: -3.7383326434978748,
};

const libraries = ["places"];

export const SingleRoute = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDayPoints, setCurrentDayPoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const isMounted = useRef(true);

  // Check current user id
  useEffect(() => {
    const getCurrentUserId = async () => {
      try {
        const resp = await fetch(process.env.BACKEND_URL + "/api/userId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(localStorage.getItem("token")),
        });
        const data = await resp.json();
        setCurrentUserId(data.userId);
        return true;
      } catch (error) {
        return;
      }
    };
    if (localStorage.getItem("token")) {
      getCurrentUserId();
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getItinerary = store.itineraries.find(
    (itinerary) => itinerary.id === parseInt(params.theid)
  );

  if (!getItinerary) {
    return <div>Itinerario no encontrado</div>;
  }

  const itinerary = getItinerary;
  const itineraryKeys = Object.keys(itinerary.itinerary);

  useEffect(() => {
    if (currentDayPoints.length >= 2 && isModalOpen && mapLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentDayPoints[0],
          destination: currentDayPoints[currentDayPoints.length - 1],
          travelMode: "WALKING",
          waypoints: currentDayPoints.slice(1, -1).map((point) => ({
            location: point,
          })),
        },
        (result, status) => {
          if (status === "OK" && isMounted.current) {
            setDirectionsResponse(result);
          } else if (status !== "OK" && isMounted.current) {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentDayPoints, isModalOpen, mapLoaded]);

  const handleShowMap = (locations) => {
    setCurrentDayPoints(locations);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDirectionsResponse(null);
    setCurrentDayPoints([]);
    setMapInstance(null);
  };

  const handleMapLoad = useCallback((map) => {
    setMapInstance(map);
    setMapLoaded(true);
  }, []);

  const handleScriptLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="row w-100 justify-content-center">
      <div className="left-col col-12 col-md-6 my-5 ms-3 ms-md-4 ms-md-0 ">
        <ItineraryCarrusel images={itinerary.images.img} />
        <hr className="my-5  w-75 mx-auto" />
        <RouteDescription data={itinerary} />
        <hr className="my-5 w-75 mx-auto " />
        <FollowCard username={itinerary.author} />
        <hr className="mt-5  w-75 mx-auto d-block d-md-none" />
      </div>
      <div className="right-col col-12 col-md-5 my-5 mx-5">
        <div className="text-end mb-3">
          {currentUserId === itinerary.author_id ? (
            <Link to={`/route/edit/${itinerary.id}`}>
              <button className="btn btn-success">Editar itinerario</button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-column align-items-center">
          {itineraryKeys.map((key, index) => (
            <div className="mx-auto w-100" key={index}>
              <AccordionContainer id={index} title={key}>
                <ul>
                  {itinerary.itinerary[key].map((location, locIndex) => (
                    <li key={locIndex}>{location.address}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-outline-primary rounded-pill my-1 w-100"
                  type="button"
                  onClick={() => handleShowMap(itinerary.itinerary[key])}
                >
                  <i className="bi bi-map"></i> Ver mapa del día
                </button>
              </AccordionContainer>
            </div>
          ))}
        </div>
        <hr className="mt-5 ms-3" />
        <CommentsSection />
      </div>

      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="mapModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-fullscreen-md-down">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header">
                <h5 className="modal-title" id="mapModalLabel">
                  Mapa del Día
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <LoadScript
                  googleMapsApiKey="AIzaSyC20pludzsgDBOMAznGfEvwYsZihsnxu8E"
                  libraries={libraries}
                  onLoad={handleScriptLoad}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={8}
                    onLoad={handleMapLoad}
                    onUnmount={() => setMapLoaded(false)}
                  >
                    {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
