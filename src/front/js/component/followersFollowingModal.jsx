import React, { useState, useEffect } from "react";
import MiniProfileCard from "../component/miniProfileCard.jsx";


export const FollowersFollowingModal = () => {

    const [activeTab, setActiveTab] = useState('followers');
    //const [followers, setFollowers] = useState([]);
    //const [following, setFollowing] = useState([]);
   // const [loading, setLoading] = useState(false);

   // useEffect(() => {
    //    if (show.bs.modal) {
     //       setLoading(true);
    //        if (activeTab === 'followers') {
                
     //       }
     //   }
    //})

    const followers = [
        { name: 'Pepe Pérez', username: 'pepepe', imageUrl: 'https://cdn.pixabay.com/photo/2024/08/22/22/03/backpacker-8990243_1280.png'},
        { name: 'Lola Luna', username: 'lolalu', imageUrl: 'https://media.istockphoto.com/id/1192648836/es/foto/joven-mujer-feliz-en-una-cabina-de-avi%C3%B3n.jpg?s=1024x1024&w=is&k=20&c=1ngB5TbUh_LebZrHA9J9CaHX_nesH47G_QX5zm18008='},
        { name: 'Pablo Suarez', username: 'psuarez', imageUrl: 'https://cdn.pixabay.com/photo/2018/05/04/12/21/man-3373868_1280.jpg'},
        { name: 'Luis Llanos', username: 'lllanos', imageUrl: 'https://cdn.pixabay.com/photo/2016/08/20/08/46/hiker-1607078_1280.jpg'},
    ];

    const following = [
        { name: 'Jack Wilson', username: 'jwilson', imageUrl: 'https://cdn.pixabay.com/photo/2021/04/28/07/45/man-6213257_1280.jpg'},
        { name: 'Lucas Luna', username: 'luluna', imageUrl: 'https://media.istockphoto.com/id/1042600048/es/foto/hombre-de-senderismo-en-los-alpes-suizos-en-appenzell.jpg?s=1024x1024&w=is&k=20&c=IIEmlUOV0EwzOAlRLhQyzaClP7Xx8Sp-BrcnKntDBQ8='},
        { name: 'lylly Carter', username: 'llycart', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/16/03/37/globe-trotter-1828079_1280.jpg'},
        { name: 'Lucia Prendez', username: 'lprendez', imageUrl: 'https://cdn.pixabay.com/photo/2017/08/29/12/07/adult-2693054_1280.jpg'},
    ];
    
    return (
        <div className="modal" id="followersFollowingModal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ShareTrips</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ul className="nav nav-tabs justify-content-center mt-2">
                <li className="nav-item">
                    <a className="nav-link active={activeTab === 'followers'}" onClick={() => setActiveTab('followers')} aria-current="page" href="#"><i class="bi bi-chat-square-heart-fill"></i>  Seguidores</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active={activeTab === 'following'}" onClick={() => setActiveTab('following')} href="#">Siguiendo  <i class="bi bi-cursor-fill"></i></a>
                </li>
            </ul>
            <div className="modal-body">
                
                {activeTab === 'followers' && (
                        followers.map((follower, index) => (
                            <MiniProfileCard
                                key={index}
                                name={follower.name}
                                username={follower.username}
                                imageUrl={follower.imageUrl}
                            />
                        ))
                    )}
                    {activeTab === 'following' && (
                        following.map((follow, index) => (
                            <MiniProfileCard
                                key={index}
                                name={follow.name}
                                username={follow.username}
                                imageUrl={follow.imageUrl}
                            />
                        ))
                    )}


            </div>
          </div>
        </div>
      </div>
    );
};

export default FollowersFollowingModal;
