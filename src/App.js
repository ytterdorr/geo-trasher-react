import React, { useState, useEffect } from "react";
import "./App.css";
import FirstView from "./views/FirstView";
import UserView from "./views/UserView";
import SessionView from "./views/SessionView";

function App() {
  const serverHost = "http://localhost:5000";
  // const serverHost = "https://ytterdorr.pythonanywhere.com";

  const [currentView, setCurrentView] = useState();
  const [viewKey, setViewKey] = useState("FirstView");
  const [currentUser, setCurrentUser] = useState("Anonymous");

  const updateView = (viewName) => {
    console.log("updating View:", viewName);
    setViewKey(viewName);
  };

  const updateUserName = (userName) => {
    console.log("Updating user name:", userName);
    setCurrentUser(userName);
  };

  useEffect(() => {
    // Set view based on key
    let view;
    switch (viewKey) {
      case "FirstView":
        view = <FirstView serverHost={serverHost} updateView={updateView} />;
        break;
      case "UserView":
        view = <UserView updateView={updateView} />;
        break;
      case "SessionView":
        view = <SessionView serverHost={serverHost} updateView={updateView} />;
        break;
      default:
        view = `Error loading page: ${viewKey}`;
    }
    setCurrentView(view);
  }, [viewKey]);
  return <div className="App">{currentView}</div>;
}

export default App;
