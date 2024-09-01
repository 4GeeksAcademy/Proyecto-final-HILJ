import React from "react";


// Supongamos que tienes un componente que muestra los detalles de un itinerario

const ItineraryDetail = ({ itineraryId }) => {
    return (
      <div>
        <h1>Itinerary Details</h1>
        {/* Mostrar detalles del itinerario aquí */}
        <CommentsList itineraryId={itineraryId} />
      </div>
    );
  };
  
  export default ItineraryDetail;
  