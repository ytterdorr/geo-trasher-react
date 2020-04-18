import React from "react";
import UserSessions from "../components/UserSessions/UserSessions";

const UserView = (props) => {
  const handleSignout = () => {
    // reset LocalStorage
    localStorage.setItem("GeoTrashName", "Anonymous");
    localStorage.setItem("token", "");
    props.updateView("FirstView");
  };

  const handleNewSession = () => {
    props.updateView("SessionView");
  };

  return (
    <div>
      <h1>Hi, {localStorage.GeoTrashName}!</h1>
      <button onClick={handleSignout}>Sign Out</button>
      <button onClick={handleNewSession}>New Session</button>
      <br />
      <UserSessions serverHost={props.serverHost} />
    </div>
  );
};

export default UserView;
