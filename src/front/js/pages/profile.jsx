import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import UserRoutes from "../component/userRoutes.jsx";
import ProfileCard from "../component/profileCard.jsx";
import CommentBox from "../component/CommentBox.jsx";
import DescriptionForm from "../component/DescriptionForm.jsx";
import SocialLinks from "../component/SocialLinks.jsx";
import Rating from "../component/Rating.js";


export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [itineraryLength, setItineraryLength] = useState("");

useEffect(() => {
  const getUser = async () => {
    try {
      const resp = await fetch(process.env.BACKEND_URL + `/api/users/${params.theid}`, {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await resp.json()
      const { user } = data
      const { itinerary } = user

      
      setUserData(data.user)
      console.log(itinerary)
      setItineraryLength(itinerary[0]?.comments.length)
   
        
    } catch (error) {
      return
    }
  }
  getUser();
}, [])





  return (
    <div className="profile-container">
      <div className="user-routes-container">
        <UserRoutes />
      </div>
      
      <div className="description-box-container">
        <div className="description-form-container">
          <DescriptionForm description={userData.description}/>
        </div>
        <div className="comment-box-container">
          <CommentBox comments={itineraryLength}/>
        </div>
        <div className="social-box-container">
          <SocialLinks facebook={userData?.social_media?.facebook} instagram={userData?.social_media?.instagram} twitter={userData?.social_media?.twitter}/>
        </div>
        {/* <div className="rating-box-container">
          <Rating data={userData}/>
        </div> */}
      </div>
      <div className="profile-card-container">
        <ProfileCard />
      </div> 
    </div>
  );
};
