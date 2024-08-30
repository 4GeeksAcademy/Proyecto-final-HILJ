import React from "react";
import { USER_DATA } from "./data/userData.js";
import FollowButton from "./buttons/followButton.jsx";
import "../../styles/profileCard.css";
import DescriptionForm from "../component/DescriptionForm.jsx";
import CommentBox from "../component/CommentBox.jsx";
import SocialLinks from "../component/SocialLinks.js";
import Rating from "../component/Rating.js";


const ProfileCard = () => {
  return (
    <>
      <div className="profile-card mx-5 my-5">
        <i className="settings fs-3 fa-solid fa-gear d-flex justify-content-end me-5"></i>
        <img
          className="profile-img my-5 mx-auto"
          src={USER_DATA.profileimg}
          alt=""
        />
        <div className="d-grid gap-4">
          <span className="username fw-bold mx-auto">
            @{USER_DATA.username}
          </span>
          <div className="d-grid gap-2">
            <span className="followers mx-auto">
              {USER_DATA.followers} seguidores
            </span>
            <span className="following mx-auto">
              {USER_DATA.following} seguidos
            </span>
          </div>
          <span className="follow mx-auto">
            <FollowButton />
          </span>
        </div>
      </div>

      {/* Contenedor para los BoxScores */}
      <div className="box-scores-container">
        <DescriptionForm />
        <CommentBox />
        <SocialLinks />
        <Rating />
      </div>
    </>
  );
};

export default ProfileCard;
