import React, { useState, useEffect } from 'react';

const SocialLinks = () => {
  const [links, setLinks] = useState({});
  const API_URL = 'https://refactored-broccoli-g4xv7wjwwrx43wg9q-3001.app.github.dev/api/user/social-media';

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        // Suponiendo que el token JWT está almacenado en el localStorage
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Se incluye el token JWT en el header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setLinks(data.social_media); // Asume que el objeto devuelto tiene una propiedad "social_media" que contiene los links

      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <div className="box-score social-links">
      <h5>Redes Sociales</h5>
      <div>
        {links.instagram && (
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        )}
        {links.twitter && (
          <a href={links.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        )}
        {links.facebook && (
          <a href={links.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
        )}
        {/* Puedes agregar más redes sociales según sea necesario */}
      </div>
    </div>
  );
};

export default SocialLinks;
