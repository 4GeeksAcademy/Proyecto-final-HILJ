import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UserRoutes from "../component/userRoutes.jsx";
import ProfileCard from "../component/profileCard.jsx";


export const Profile = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div>
      <UserRoutes/>
      <ProfileCard/>
     
    </div>
  );
};

