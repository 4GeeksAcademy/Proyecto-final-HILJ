import React, { useState, useEffect } from 'react';

const DescriptionForm = () => {
  const [description, setDescription] = useState(''); // Estado para almacenar la descripción
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const url = 'https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/admin/user/'; // Reemplaza con tu endpoint
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al obtener la descripción');
        }
        
        const data = await response.json();
        setDescription(data.description); // Suponiendo que 'data.description' contiene la información deseada
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Detenemos el estado de carga
      }
    };

    fetchDescription(); // Llamada a la función para obtener la descripción al montar el componente
  }, []); // El array vacío significa que este efecto se ejecuta solo una vez al montar el componente

  const handleChange = (e) => {
    setDescription(e.target.value); // Actualiza el estado con el nuevo valor del textarea
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la API si es necesario
    console.log('Descripción guardada:', description);
  };

  if (loading) {
    return <div className="box-score description-form">Cargando...</div>;
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
