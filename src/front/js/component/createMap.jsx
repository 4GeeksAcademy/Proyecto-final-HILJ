import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
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

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [points, setPoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inputValue, setInputValue] = useState("");

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
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPoint = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        };
        setPoints((prevPoints) => [...prevPoints, newPoint]);

        // Mover el mapa al nuevo punto
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

  console.log(points);
  console.log(map);

  return (
    <LoadScript
      googleMapsApiKey="añade aqui la API key de Google Maps"
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

      <div>
        <Autocomplete
          onLoad={handleAutocompleteLoad}
          onPlaceChanged={handlePlaceSelect}
          options={{
            componentRestrictions: { country: "es" },
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Introduce una ubicación"
            style={{
              width: "400px",
              height: "40px",
              marginBottom: "10px",
            }}
          />
        </Autocomplete>
      </div>

      <div>
        <button onClick={handleRemoveLastPoint}>Eliminar último punto</button>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
