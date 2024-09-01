import React, { useState, useEffect } from 'react';

const DescriptionForm = () => {
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true); 

      try {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { profile } = data;

        setDescripcion(profile.description); // Asegúrate de que `profile` tenga la descripción
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDescription();
  }, []);

  if (loading) {
    return <div className="box-score description-form spinner-border"></div>;
  }

  if (error) {
    return <div className="box-score description-form">Error: {error}</div>;
  }

  return (
    <div className="box-score description-form">
      <p>{descripcion}</p>
    </div>
  );
};

export default DescriptionForm;
