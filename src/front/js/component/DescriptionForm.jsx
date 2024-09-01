import React, { useState, useEffect } from 'react';

const DescriptionForm = ({ userId }) => {
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/users");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { users } = data;
        const [{ description }] = users;

        setDescripcion(description);
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