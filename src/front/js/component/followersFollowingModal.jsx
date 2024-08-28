import React, { useState } from 'react';


export const FollowersFollowingModal = () => {
    
    return (
        <div className="modal" id="followersFollowingModal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ShareTrips</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Seguidores</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Seguidos</a>
                </li>
            </ul>
            <div className="modal-body">
                
                <div className="card">
                    <div className="row">
                        <div className="col-4">
                            <img className="img-fluid" src="https://cdn.pixabay.com/photo/2024/08/22/22/03/backpacker-8990243_1280.png" alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h1 className="h5 card-title">Pepe Perez</h1>
                                <h2 className="h6 card-subtitle text-muted mb-2">@peperez</h2>
                                <p className="card-text">Resumen del perfil.</p>
                                <a href="#" className="card-link">more +</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card">
                    <div className="row">
                        <div className="col-4">
                            <img className="img-fluid" src="https://cdn.pixabay.com/photo/2024/08/22/22/03/backpacker-8990243_1280.png" alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h1 className="h5 card-title">Pepe Perez</h1>
                                <h2 className="h6 card-subtitle text-muted mb-2">@peperez</h2>
                                <p className="card-text">Resumen del perfil.</p>
                                <a href="#" className="card-link">more +</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FollowersFollowingModal;
