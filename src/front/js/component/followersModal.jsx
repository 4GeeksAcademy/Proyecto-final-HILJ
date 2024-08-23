import React from "react";

export const FollowersModal = () => {
    return (
        <div id="followersModal" className="modal" tabindex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">ShareTrips</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="true" href="#">Seguidores</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Siguiendo</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">

                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        A list item
                        <span className="badge text-bg-primary rounded-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        A second list item
                        <span className="badge text-bg-primary rounded-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        A third list item
                        <span className="badge text-bg-primary rounded-pill">1</span>
                    </li>
                </ul>


                </div>
            </div>
                
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default FollowersModal