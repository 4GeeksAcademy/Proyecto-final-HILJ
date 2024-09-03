import React, { useState, useEffect } from 'react';

const CommentsCount = ({ comments }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  return (
    <div>
      <p>Total de comentarios en tus itinerarios: {comments} <i class="bi bi-chat-left"></i></p>
    </div>
  );
};

export default CommentsCount;
