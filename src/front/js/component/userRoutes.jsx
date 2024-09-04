import React, { useEffect, useState } from "react";
import BlueButton from "./buttons/blueButton.jsx";
import SmallRouteCard from "./smallRouteCard.jsx"; // Mantén este componente para los recuadros
import { Link, useParams } from "react-router-dom";

const UserRoutes = () => {
  const [cities, setCities] = useState([]); // Estado para almacenar las ciudades
  const params = useParams(); // Obtener el parámetro de la URL

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/itineraries/author/${params.theid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const cityNames = data.itineraries.map(route => ({
          id: route.id, // Puedes usar el id de la ruta como key
          city: route.city,
          title: route.title,
          images: route.images
        })); // Extraer las ciudades y otra información relevante
        setCities(cityNames); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [params.theid]); // Dependencia del parámetro theid

  return (
    <>
      <div className="userRoutes ms-5 my-4 justify-content-center">
        <h2 className="text-center fw-bold pt-5 pb-3">Mis Rutas</h2>
        {setCities.length > 0 ? (
          cities.map((route) => (
            <div key={route.id} className="mb-3">
              <SmallRouteCard
                img={route.images && Object.keys(route.images).length > 0 
                      ? route.images 
                      : "placeholder-image-url"} // Usa la URL de imagen de placeholder si no hay imágenes disponibles
                title={route.title} // El título de la ruta
              />
              <p className="text-center">Ciudad: {route.city}</p> {/* Mostrar la ciudad */}
            </div>
          ))
        ) : (
          <p className="text-center">No hay rutas disponibles.</p>
        )}
        <br />
        <span className="fw-bold fs-5 d-flex justify-content-center">
          Crear nueva ruta
        </span>
        <span className="d-flex justify-content-center mt-3">
          <Link to={"/route/create"}>
            <BlueButton buttonName={<i className="fa-solid fa-plus"></i>} />
          </Link>
        </span>
      </div>
    </>
  );
};

export default UserRoutes;
