import React from "react";

export const ItineraryCarrusel = ({ images }) => {
  return (
    <>
      <div id="itineraryCarrusel" className="carousel slide">
        <div className="carousel-inner uploaded">
          <div className="carousel-item active">
            <img
              src={images.length > 0 ? images[0] : ""}
              className="d-block uploaded"
              alt="Imagen de itinerario"
            />
          </div>
          {images.length > 1
            ? images.slice(1).map((url, index) => (
                <div key={index} className="carousel-item uploaded">
                  <img
                    src={url}
                    className="d-block uploaded"
                    alt="Imagen de itinerario"
                  />
                </div>
              ))
            : ""}

          {images.length > 1 ? (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#itineraryCarrusel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#itineraryCarrusel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
