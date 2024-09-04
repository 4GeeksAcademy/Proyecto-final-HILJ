import React, { useState, useEffect } from "react";
import FollowButton from "../component/buttons/followButton.jsx";
import "../../styles/profileCard.css";
import Avvvatars from "avvvatars-react";
import { useParams } from "react-router-dom";
import DeleteAccountLink from "./deleteAccount.js";

const ProfileCard = ({ username, profileimage }) => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [profileimg, setProfileImage] = useState(profileimage); 
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [file, setFile] = useState(null);

  // Fetch para obtener el nombre de usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/users/${params.theid}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Enviar token en el header
          },
        });

        if (response.ok) {
          const data = await response.json(); // Obtiene los datos del usuario
          setUsername(data.username); // Guarda el nombre de usuario en el estado
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario
  }, [params.theid]);

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Guardar el archivo seleccionado para subirlo
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Mostrar la imagen seleccionada en la vista previa
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Función para subir la imagen a Cloudinary y actualizar el perfil
  const handleSave = async () => {
    let imageUrl = profileimg; // Mantener la imagen actual si no se selecciona una nueva

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dlfq7smx"); // Reemplaza con tu upload preset de Cloudinary
      formData.append("api_key", "853636263856715"); // Reemplaza con tu API key de Cloudinary

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dlfq7smx/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          imageUrl = data.secure_url; // Guardar la URL segura de la imagen subida
        } else {
          console.error("Error subiendo la imagen:", data);
          alert("Error al subir la imagen");
          return;
        }
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
        alert("Error al subir la imagen");
        return;
      }
    }
  
    // Formatear los enlaces sociales
    const formattedSocialLinks = {};
    for (const [key, value] of Object.entries(socialLinks)) {
      if (value) {
        formattedSocialLinks[key] = `https://www.${key}.com/${value.replace('@', '')}`;
      }
    }

    // Actualizar el perfil del usuario en el backend
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/users/${params.theid}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          social_media: formattedSocialLinks,
          profile_image: imageUrl, 
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Perfil actualizado con éxito");
        setShowModal(false); // Cerrar el modal si la actualización es exitosa
        window.location.reload(); // Refresca la página para reflejar los cambios
      } else {
        alert(`Error: ${result.msg || "Error desconocido"}`);
        console.error("Error en la respuesta:", result);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
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
            {profileimg ? (
              <img
                src={profileimg}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={username} size={200} />
            )}
          </span>
          <span 
          className="username fw-bold mx-auto">@{username}</span>
          
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
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="profile-image-upload text-center mb-3">
                <label htmlFor="profileImageInput">
                  {profileimg ? (
                    <img
                      src={profileimg}
                      alt="User profile"
                      className="profile-img rounded-circle"
                      style={{ cursor: "pointer", width: "150px", height: "150px" }}
                    />
                  ) : (
                    <Avvvatars
                      value={username}
                      size={150}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <div className="change-image-text mt-2">
                    Cambia tu foto de perfil
                  </div>
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
                onClick={handleSave}
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
