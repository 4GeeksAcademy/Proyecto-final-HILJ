import React, { useState } from 'react';

const DeleteAccountLink = () => {
  const [password, setPassword] = useState('');

  const handleDeleteAccount = async (token) => {
    // Verificación del token y la contraseña
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/verify-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Si la contraseña es correcta, proceder a eliminar la cuenta
        const deleteResponse = await fetch(`${process.env.BACKEND_URL}/api/delete-account/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (deleteResponse.ok) {
          alert('Cuenta eliminada');
          // Redirigir al usuario, cerrar sesión, etc.
        } else {
          const data = await deleteResponse.json();
          alert(`Error: ${data.error}`);
        }
      } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al eliminar la cuenta');
    }
  };

  return (
    <>
      {/* Enlace para borrar la cuenta */}
      <p>
        <a
          href="#deleteAccount"
          className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          data-bs-toggle="modal"
          data-bs-target="#deleteAccount"
        >
          Borrar Cuenta
        </a>
      </p>

      {/* Modal de confirmación para borrar la cuenta */}
      <div 
        className="modal fade"
        id="deleteAccount"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content border-0 rounded-4">
            <div className="modal-header">
              <h1 className="modal-title fs-5 logo">ShareTrips</h1>
              <button
                type="button"
                className="btn-close me-1"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
              <input
                type="password"
                className="form-control"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteAccount(localStorage.getItem('token'))}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountLink;
