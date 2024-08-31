import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";


const CommentBox = () => {
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchComments = async () => {
    try {
      const url = 'https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/admin/comments/'; // Reemplaza con tu endpoint
      const response = await fetch(url, { method: 'GET' });

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al obtener los comentarios');
      }

      const data = await response.json();
      setComments(data); // Suponiendo que 'data' es un array de comentarios
    } catch (err) {
      setError(`Error: ${err.message}`); // Manejo del error
      console.error('Error:', err); // Imprime el error en la consola para depuración
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };

  useEffect(() => {
    fetchComments(); // Llamada a la función para obtener comentarios al montar el componente
  }, []); // El array vacío significa que este efecto se ejecuta solo una vez al montar el componente

  if (loading) {
    return <div className="box-score comment-box">Cargando comentarios...</div>;
  }

  if (error) {
    return <div className="box-score comment-box">Error: {error}</div>;
  }

  return (
    <div className="box-score comment-box">
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
