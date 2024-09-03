import React, { useState } from "react";
import { USER_DATA } from "./data/userData";
import FollowButton from "../component/buttons/followButton.jsx";
import "../../styles/profileCard.css";
import Avvvatars from "avvvatars-react";
import { useParams } from "react-router-dom";

const ProfileCard = () => {
  const {} = useParams(); 
  const [showModal, setShowModal] = useState(false); 
  const [profileImage, setProfileImage] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [socialLinks, setSocialLinks] = useState({}); 

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/users/${theid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          description: description,
          social_media: socialLinks,
          image_url: profileImage
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Perfil actualizado con éxito');
        setShowModal(false); // Cerrar el modal si la actualización es exitosa
      } else {
        alert(`Error: ${result.msg || 'Error desconocido'}`);
        console.error('Error response:', result);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <>
      <div className="profile-card">
        <i
          className="settings fs-3 fa-solid fa-gear d-flex justify-content-end me-5"
          onClick={() => setShowModal(true)} 
          style={{ cursor: "pointer" }}
          data-bs-toggle="modal"
          data-bs-target="#editProfileModal"
        ></i>
        <div className="d-grid gap-4">
          <span className="profile-image mx-auto">
            {profileImage ? (
              <img
                src={profileImage}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={username} size={300} />
            )}
          </span>
          <span className="username fw-bold mx-auto">
            @{USER_DATA.username} 
          </span>
          <div className="d-grid gap-2">
            <span className="followers mx-auto">
              {USER_DATA.followers} seguidores
            </span>
            <span className="following mx-auto">
              {USER_DATA.following} seguidos
            </span>
          </div>
          <span className="follow mx-auto">
            <FollowButton />
          </span>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal"
        tabIndex="-1"
        id="editProfileModal"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Perfil</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)} // Cerrar el modal
              ></button>
            </div>
            <div className="modal-body">
              <div className="profile-image-upload text-center mb-3">
                <label htmlFor="profileImageInput">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="User profile"
                      className="profile-img rounded-circle"
                      style={{ cursor: "pointer", width: "150px", height: "150px" }}
                    />
                  ) : (
                    <Avvvatars
                      value={USER_DATA.username}
                      size={150}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <div className="change-image-text mt-2">Cambia tu foto de perfil</div>
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">Háblales de ti</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="socialLinks">Social Links</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Twitter"
                  value={socialLinks.twitter || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Facebook"
                  value={socialLinks.facebook || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instagram"
                  value={socialLinks.instagram || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave} // Llamar a la función para guardar los cambios
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
