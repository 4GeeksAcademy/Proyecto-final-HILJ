import React, { useState } from 'react';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="box-score">
      <h5>Ranking</h5>
      <div className="rating">
        {[...Array(5)].map((star, index) => (
          <span
            key={index}
            className={index < rating ? "active" : ""}
            onClick={() => handleRating(index)}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
