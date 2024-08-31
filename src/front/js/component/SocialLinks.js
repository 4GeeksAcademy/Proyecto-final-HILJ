import React, { useState, useEffect } from 'react';

const SocialLinks = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('/api/social-links');
        const data = await response.json();
        setLinks(data);
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
      </div>
    </div>
  );
};

export default SocialLinks;
