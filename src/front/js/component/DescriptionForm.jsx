
import React, { useState, useEffect } from 'react';

const DescriptionForm = ( { description } ) => {
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  return (
    <div className="box-score description-form">
      <p>{description}</p>
      
    </div>
  );
};

export default DescriptionForm;
