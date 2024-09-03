import React, { useState, useEffect } from 'react';

const SocialLinks = ({facebook, instagram, twitter}) => {
  // const [links, setLinks] = useState(null); 
  // const [loading, setLoading] = useState(true); 
  // const [error, setError] = useState(null); 
  // const API_URL = `${process.env.BACKEND_URL}/api/user/social-media`;
//   useEffect(() => {
//     const fetchSocialLinks = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await fetch(API_URL, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setLinks(data.social_media);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchSocialLinks();
//   }, []);

//   if (loading) {
//     return <div className="box-score social-links">Loading social links...</div>;
//   }

//   if (error) {
//     return <div className="box-score social-links">Error fetching social links: {error}</div>;
//   }

  return (
    <div className="box-score social-links">
      <h5>Redes Sociales</h5>
      
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
         
          
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
         
         
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
    
         
        </div>
  );
};

export default SocialLinks;
