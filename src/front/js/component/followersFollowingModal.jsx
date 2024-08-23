import React, { useState } from 'react';
import ProfileCard from '../component/profileCard.jsx'

export const FollowersFollowingModal = ({ show, handleClose }) => {
    const [activeTab, setActiveTab] = useState('followers'); // Estado para manejar la pestaña activa

    // Datos de ejemplo para seguidores y seguidos
    const followers = [
        { name: 'Juan Pérez', username: 'juanperez', imageUrl: 'https://via.placeholder.com/50' },
        { name: 'María García', username: 'mariagarcia', imageUrl: 'https://via.placeholder.com/50' },
    ];

    const following = [
        { name: 'Carlos López', username: 'carloslopez', imageUrl: 'https://via.placeholder.com/50' },
        { name: 'Ana Martínez', username: 'anamartinez', imageUrl: 'https://via.placeholder.com/50' },
    ];

    return (
        <Modal id="followersFollowingModal" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link
                            active={activeTab === 'followers'}
                            onClick={() => setActiveTab('followers')}
                        >
                            Seguidores
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            active={activeTab === 'following'}
                            onClick={() => setActiveTab('following')}
                        >
                            Siguiendo
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Modal.Header>
            <Modal.Body>
                {activeTab === 'followers' && (
                    <>
                        {followers.map((follower, index) => (
                            <ProfileCard
                                key={index}
                                name={follower.name}
                                username={follower.username}
                                imageUrl={follower.imageUrl}
                            />
                        ))}
                    </>
                )}
                {activeTab === 'following' && (
                    <>
                        {following.map((follow, index) => (
                            <ProfileCard
                                key={index}
                                name={follow.name}
                                username={follow.username}
                                imageUrl={follow.imageUrl}
                            />
                        ))}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FollowersFollowingModal;
