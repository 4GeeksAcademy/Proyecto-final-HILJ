import React, { useState, useEffect } from "react";
import BlueButton from "./blueButton.jsx";
import {
  GoogleMap,
  DirectionsRenderer,
  LoadScript,
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

const MapComponent = ({ ruta, onLoad }) => (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={6}
    onLoad={onLoad}
  >
    {ruta && <DirectionsRenderer options={{ directions: ruta }} />}
  </GoogleMap>
);

const MarkedMap = () => {
  const [markers, setMarkers] = useState(null);
  const [ruta, setRuta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (markers) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: 40.416775, lng: -3.70379 },
          destination: { lat: 41.385064, lng: 2.173404 },
          travelMode: "WALKING",
          waypoints: [
            { location: { lat: 40.629269, lng: -3.164486 } },
            { location: { lat: 40.962882, lng: -3.637217 } },
            { location: { lat: 41.430712, lng: 1.852566 } },
          ],
        },
        (result, status) => {
          if (status === "OK") {
            setRuta(result);
          } else {
            console.error(`Error al hacer fetch a la ruta, ${result}`);
          }
        }
      );
    }
  }, [markers]);

  return (
    <>
      <BlueButton buttonName="Ver ruta" onclick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <div
          className="map-modal modal-lg fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div className="map-modal modal-dialog">
            <div className="map-modal modal-content border-0 rounded-4">
              <div className="map-modal modal-header">
                <h1 className="map-modal modal-title fs-5 logo">ShareTrips</h1>
                <button
                  type="button"
                  className="btn-close me-1"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="map-modal modal-body">
                <div className="text-center">
                  <MapComponent ruta={ruta} onLoad={setMarkers} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App = () => (
  <LoadScript
    googleMapsApiKey="AIzaSyD2xZz7fZATEPYBmHAQ8BNTVNNwDiDAZcY"
    libraries={libraries}
  >
    <MarkedMap />
  </LoadScript>
);

export default App;
