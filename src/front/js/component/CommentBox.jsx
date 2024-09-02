import React, { useState, useEffect } from 'react';

const CommentsCount = () => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        // Usar el token de localStorage para la autenticación
        const token = localStorage.getItem('token');
        
        // Asegurarse de que el token existe
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/my-itineraries/comments-count`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCommentsCount(data.comments_count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsCount();
  }, []);

  if (loading) {
    return <div>Loading comments count...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Total de comentarios en tus itinerarios: {commentsCount}</p>
    </div>
  );
};

export default CommentsCount;
