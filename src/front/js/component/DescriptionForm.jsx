import React from 'react';

const DescriptionForm = () => {
  return (
    <div className="box-score description-form">
      <form>
        <textarea placeholder="Descripción breve..." rows="3"></textarea>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DescriptionForm;
