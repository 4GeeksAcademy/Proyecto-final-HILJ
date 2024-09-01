import React, { useState, useEffect } from 'react';
import ItineraryDetail from './ItineraryId.jsx';

const CommentBox = ({ itineraryId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/admin/itineraries/${itineraryId}/comments`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los comentarios');
        }
        
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [itineraryId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Comentarios</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <small>by User {comment.author_id} on {comment.creation_date}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentBox;
