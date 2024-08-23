import React from 'react';

export const ProfileCard = ({ name, username, imageUrl }) => {
    return (
        <Card style={{ width: '100%', marginBottom: '10px' }}>
            <Card.Body className="d-flex align-items-center">
                <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt="Foto de perfil"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div style={{ marginLeft: '15px' }}>
                    <Card.Title style={{ marginBottom: '5px' }}>{name}</Card.Title>
                    <Card.Text>@{username}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard;

