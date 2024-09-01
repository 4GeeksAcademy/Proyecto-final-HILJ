import React, { useState, useEffect } from 'react';

const DescriptionForm = ({ userId }) => {
  const [description, setDescription] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true); 

      try {
        const url = `https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/admin/user/${userId}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al obtener la descripción');
        }
        
        const data = await response.json();
        setDescription(data.description); // Suponiendo que 'data.description' contiene la información deseada
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    if (userId) {
      fetchDescription(); // 
    }
  }, [userId]); 

  const handleChange = (e) => {
    setDescription(e.target.value); // Actualiza el estado con el nuevo valor del textarea
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/admin/user/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la descripción');
      }

      console.log('Descripción guardada:', description);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="box-score description-form spinner-border"></div>;
  }

  if (error) {
    return <div className="box-score description-form">Error: {error}</div>;
  }

  return (
    <div className="box-score description-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Descripción breve..."
          rows="3"
          value={description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DescriptionForm;
