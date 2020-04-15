import React, { useState } from "react";

const UserView = (props) => {
  const [profileName, setProfileName] = useState(localStorage.GeoTrasherName);
  const handleSignout = () => {
    // reset LocalStorage
    localStorage.setItem("GeoTrashName", "Anonymous");
    localStorage.setItem("token", "");
    props.updateView("FirstView");
  };
  return (
    <div>
      <h1>Hi, {profileName ? profileName : "Person"}!</h1>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default UserView;
