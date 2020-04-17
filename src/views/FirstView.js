import React from "react";
import DataDisplay from "../components/DataDisplay/DataDisplay";
// import Card from "../components/Card/Card";
import SigninSignup from "../components/SigninSignup/SigninSignup";
import Colors from "../Colors";
// What do I Want to present in this first view?
// Data-display
//

const FirstView = (props) => {
  const handleSessionButton = () => {
    localStorage.GeoTrashName = "Anonymous";
    props.updateView("SessionView");
  };
  return (
    <div className="view-container">
      <h1>GeoTrasher!</h1>
      <button style={myStyles.Button} onClick={handleSessionButton}>
        Anonymous session
      </button>
      <SigninSignup
        serverHost={props.serverHost}
        updateView={props.updateView}
      />
      <DataDisplay
        serverHost={props.serverHost}
        sessionID="0"
        style={myStyles.CardStyle}
      />
    </div>
  );
};

const myStyles = {
  CardStyle: {
    backgroundColor: Colors.defaultBackground,
    width: "150px",
    maxwidth: "80%",
    marginBottom: "10px",
    padding: "10px",
  },
  Button: {
    backgroundColor: Colors.blue,
    padding: "5px",
    marginBottom: "10px",
  },
};

export default FirstView;
