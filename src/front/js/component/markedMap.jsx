import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
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

const MarkedMap = () => {
  const [map, setMap] = useState(null);
  const [ruta, setRuta] = useState(null);

  useEffect(() => {
    if (map) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: 40.416775, lng: -3.70379 },
          destination: { lat: 41.385064, lng: 2.173404 },
          travelMode: "DRIVING",
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
  }, [map]);

  return (
    <LoadScript
      googleMapsApiKey="añade aqui la API key de Google Maps"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {ruta && (
          <DirectionsRenderer
            options={{
              directions: ruta,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MarkedMap;
