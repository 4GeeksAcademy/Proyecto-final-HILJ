import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/buttonfilter.css";

export const FilterButton = () => {
  // Estado para manejar el valor del rango
  const [rangeValue, setRangeValue] = useState(0);

  // Función para manejar el cambio en el input de rango
  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <>
      <div className="container">
        {/* Botón que activa el modal */}
        <button
          type="button"
          className="btn custom-button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="bi bi-sliders"></i> Filtros
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-7" id="exampleModalLabel">
                  Filtrar
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Filtro de Días */}
                <div className="d-flex flex-column align-items-start">
                  <label htmlFor="customRange2" className="form-label d-flex mb-2">
                    Días
                  </label>
                  <div className="position-relative w-100">
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="7"
                      id="customRange2"
                      value={rangeValue}
                      onChange={handleRangeChange}
                      style={{ width: '100%' }}
                    />
                    <div
                      className="position-absolute"
                      style={{
                        left: `${(rangeValue / 7) * 100}%`,
                        transform: 'translateX(-50%)',
                        top: '50%',
                        whiteSpace: 'nowrap',
                        marginTop: '4px',
                      }}
                    >
                      <div className="bg-dark text-white px-2 py-1 rounded">
                        {rangeValue}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span>0</span>
                      <span>+7</span>
                    </div>
                  </div>
                </div>

                {/* Tipos de Ruta */}
                <div className="container text-center mt-3">
                  <label htmlFor="customRange2" className="form-label d-flex p-2">
                    Tipos de ruta
                  </label>
                  <div className="row row-cols-3 row-cols-md-5 g-2">
                    {Array.from({ length: 10 }, (_, index) => (
                      <div key={index} className="col">
                        <div
                          className="card border-dark d-flex align-items-center justify-content-center"
                          style={{ height: '75px', width: '75px' }}
                        >
                          <div className="card-body d-flex align-items-center justify-content-center p-0">
                            <h6 className="card-title m-0">Ruta {index + 1}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actividades */}
                <div className="container text-center mt-3">
                  <label htmlFor="customRange2" className="form-label d-flex p-2">
                    Actividades
                  </label>
                  <div className="row row-cols-3 row-cols-md-5 g-2">
                    {Array.from({ length: 10 }, (_, index) => (
                      <div key={index} className="col">
                        <div
                          className="card border-dark d-flex align-items-center justify-content-center"
                          style={{ height: '75px', width: '75px' }}
                        >
                          <div className="card-body d-flex align-items-center justify-content-center p-0">
                            <h6 className="card-title m-1">Actividad {index + 1}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-clear-filter btn-sm"
                  data-bs-dismiss="modal"
                >
                  Borrar Filtro
                </button>
                <button type="button" className="btn btn-apply-filter btn-sm">
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
