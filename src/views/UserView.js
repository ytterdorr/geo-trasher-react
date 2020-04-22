import React, { useState } from "react";
import UserSessions from "../components/UserSessions/UserSessions";
import Card from "../components/Card/Card";
import Colors from "../styles/Colors";

const UserView = (props) => {
  const [totalItems, setTotalItems] = useState("");

  const updateTotalItems = (totalItemsObj) => {
    setTotalItems(totalItemsObj);
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ width: styles.buttonHolder.width }}></div>
        <h1>Hi, {localStorage.GeoTrashName}!</h1>
        <div className="buttonHolder" style={styles.buttonHolder}>
          <button onClick={handleSignout}>Sign Out</button>
        </div>
      </div>
      <button
        onClick={handleNewSession}
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: Colors.defaultWhite,
          backgroundColor: "green",
          width: 200,
          height: 50,
          boxShadow: "0px 0px 3px 3px rgba(200, 200, 255, 100)",
        }}
      >
        New Session
      </button>
      <h2>My Total: </h2>

      <Card style={{ width: "100vw", margin: "auto" }}>
        {totalItems ? (
          <div>
            <b>All Items: {totalItems.Nikotin + totalItems.Annat}</b> <br />
            Nicotine: {totalItems.Nikotin}
            <br />
            Other: {totalItems.Annat}
          </div>
        ) : (
          "Loading..."
        )}
      </Card>
      <br />
      <UserSessions
        serverHost={props.serverHost}
        updateTotalItems={updateTotalItems}
      />
    </div>
  );
};

const styles = {
  buttonHolder: {
    display: "flex",
    justifyContent: "center",
    width: 100,
  },
};
export default UserView;
