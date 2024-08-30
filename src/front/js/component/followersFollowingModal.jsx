import React, { useState } from "react";
import ProfileCard from "../component/profileCard.jsx";


export const FollowersFollowingModal = () => {

    const [activeTab, setActiveTab] = useState('followers');

    const followers = [
        { name: 'Pepe Pérez', username: 'pepepe', imageUrl: 'https://cdn.pixabay.com/photo/2024/08/22/22/03/backpacker-8990243_1280.png'},
        { name: 'Lola López', username: 'lolalo', imageUrl: 'https://media.istockphoto.com/id/1192648836/es/foto/joven-mujer-feliz-en-una-cabina-de-avi%C3%B3n.jpg?s=1024x1024&w=is&k=20&c=1ngB5TbUh_LebZrHA9J9CaHX_nesH47G_QX5zm18008='},
    ];

    const following = [
        { name: 'Jack Wilson', username: 'jwilson', imageUrl: 'https://cdn.pixabay.com/photo/2021/04/28/07/45/man-6213257_1280.jpg'},
        { name: 'Lucas Luna', username: 'luluna', imageUrl: 'https://media.istockphoto.com/id/1042600048/es/foto/hombre-de-senderismo-en-los-alpes-suizos-en-appenzell.jpg?s=1024x1024&w=is&k=20&c=IIEmlUOV0EwzOAlRLhQyzaClP7Xx8Sp-BrcnKntDBQ8='},
    ];
    
    return (
        <div className="modal" id="followersFollowingModal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ShareTrips</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <a class="nav-link" active={activeTab === 'followers'} onClick={() => setActiveTab('followers')} aria-current="page" href="#">Seguidores</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" active={activeTab === 'following'} onClick={() => setActiveTab('following')} href="#">Seguiendo</a>
                </li>
            </ul>
            <div className="modal-body">
                
                {activeTab === 'followers' && (
                        followers.map((follower, index) => (
                            <ProfileCard
                                key={index}
                                name={follower.name}
                                username={follower.username}
                                imageUrl={follower.imageUrl}
                            />
                        ))
                    )}
                    {activeTab === 'following' && (
                        following.map((follow, index) => (
                            <ProfileCard
                                key={index}
                                name={follow.name}
                                username={follow.username}
                                imageUrl={follow.imageUrl}
                            />
                        ))
                    )}


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
