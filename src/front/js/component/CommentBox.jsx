import React from 'react';

const CommentBox = () => {
  const comments = ["¡Gran perfil!", "Me encanta tu contenido", "Sigue así!"]; // Ejemplos de comentarios

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
