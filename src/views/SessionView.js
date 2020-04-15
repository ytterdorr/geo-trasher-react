import React from "react";

const SessionView = (props) => {
  const handleEndSession = () => {
    props.updateView("FirstView");
  };
  return (
    <div>
      <h1>Session, {props.userName}</h1>
      <button onClick={handleEndSession}>End session</button>
    </div>
  );
};

export default SessionView;
