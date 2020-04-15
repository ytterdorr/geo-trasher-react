import React, { useState } from "react";

const UserView = (props) => {
  const [profileName, setProfileName] = useState(localStorage.GeoTrasherName);
  const handleSignout = () => {
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
