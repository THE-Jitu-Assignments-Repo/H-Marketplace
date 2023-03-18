import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  // useEffect(()=>{
  //     setUser(auth.currentUser)
  // },[])
  const {name, email} = formData

  const onLogout = () =>{
    auth.signOut()
    navigate('/')
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={onLogout}>Logout</button>
      </header>
    </div>
  );
}

export default Profile;
