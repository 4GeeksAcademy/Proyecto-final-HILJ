import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UserRoutes from "../component/userRoutes.jsx";
import ProfileCard from "../component/profileCard.jsx";


export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div>
      <UserRoutes/>
      <ProfileCard/>
     
    </div>
  );
};

