import React from "react";

export const ProfileCard = ({ name, username, imageUrl }) => {
    return (
        <div className="card" style={{ width: '100%', marginBottom: '10px'}}>
                    <div className="card-body d-flex align-items-center">
                        
                        <img className="img" variant="top" src={imageUrl} alt="Foto de perfil" style={{ width: '50px', height: '50px', borderRadius: '50px'}} />
                        
                        <div style={{ marginLeft: '15px' }}>
                            <div className="title" style={{ marginBottom: '5px' }}>{name}</div>
                            <div className="text">@{username}</div>    
                        </div>
                    </div>
        </div>
    );
};

export default ProfileCard;