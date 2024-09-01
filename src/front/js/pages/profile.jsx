import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import UserRoutes from "../component/userRoutes.jsx";
import ProfileCard from "../component/profileCard.jsx";
import CommentBox from "../component/CommentBox.jsx";
import DescriptionForm from "../component/DescriptionForm.jsx";
import SocialLinks from "../component/SocialLinks.js";
import Rating from "../component/Rating.js";


export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="profile-container">
      <div className="user-routes-container">
        <UserRoutes />
      </div>
      
      <div className="description-box-container">
        <div className="description-form-container">
          <DescriptionForm />
        </div>
        <div className="comment-box-container">
          <CommentBox />
        </div>
        <div className="social-box-container">
          <SocialLinks />
        </div>
        <div className="rating-box-container">
          <Rating />
        </div>
      </div>
      
      <div className="profile-card-container">
        <ProfileCard />
      </div> 
    </div>
  );
};
