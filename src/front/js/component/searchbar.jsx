import React, { useContext, useEffect, useState } from "react";
import "../../styles/searchbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

const Searchbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    search: '',
    duration: undefined
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `/api/itineraries`;
  
    if (formData.search) {
      url += `?city=${encodeURIComponent(formData.search)}`;
  }

    if (formData.duration) {
      url += `&duration=${formData.duration}`;
  }
    try {
      const resp = await fetch(process.env.BACKEND_URL + url, {
        method: 'GET',
      });
      const data = await resp.json()
      if (!resp.ok || data.itineraries.length === 0) {
        // Si la respuesta no es exitosa o no se encontraron itinerarios,
        // actualiza el store y localStorage con un arreglo vacío.
        store.itineraries = [];
        localStorage.setItem('itineraries', JSON.stringify([]));
        navigate('/search', { state: { itineraries: [] } });
      } else {
        // Si la búsqueda es exitosa, guarda los itinerarios en el store y en localStorage.
        store.itineraries = data.itineraries;
        localStorage.setItem('itineraries', JSON.stringify(data.itineraries));
        navigate('/search', { state: { itineraries: data.itineraries } });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({...formData, [name]: value})
  }

  return (
    <>
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="search d-flex">
            <form onSubmit={handleSubmit}>
              <input
                className="search_input w-50 mt-0"
                onChange={handleChange}
                type="text"
                name="search"
                value={formData.search}
                placeholder="Destino/@username"
              />
              <input
                className="search_input w-25 me-auto mt-0"
                onChange={handleChange}
                type="number"
                min={1}
                name="duration"
                value={formData.duration}
                placeholder="Duración"
              />
              <button type="submit" className="search_icon border-0 bg-transparent">
                <i type='submit' className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
