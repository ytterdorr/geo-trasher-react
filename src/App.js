import React, { useState, useEffect } from "react";
import "./App.css";
import FirstView from "./views/FirstView";
import UserView from "./views/UserView";
import SessionView from "./views/SessionView";
import InstructionsView from "./views/InstructionsView";

function App() {
  // const serverHost = "http://localhost:5000";
  const serverHost = "https://ytterdorr.pythonanywhere.com";

  const [currentView, setCurrentView] = useState();
  const [viewKey, setViewKey] = useState(
    Number(sessionStorage.sessionID) > 0
      ? "SessionView"
      : localStorage.GeoTrashName && localStorage.GeoTrashName !== "Anonymous"
      ? "UserView"
      : "FirstView"
  );

  const updateView = (viewName) => {
    console.log("updating View:", viewName);
    setViewKey(viewName);
  };

  // Check if user is already signed i

  useEffect(() => {
    const forceHTTPS = () => {
      console.log("Location:", window.location.href[4]);
      let url = window.location.href;
      if (url[4] !== "s") {
        window.location = url.slice(0, 4) + "s" + url.slice(4);
        console.log("Found http, forcing https");
      }
    };

    if (!window.location.href.includes("localhost")) {
      forceHTTPS();
    }
    // Set view based on key
    let view;
    switch (viewKey) {
      case "FirstView":
        view = <FirstView serverHost={serverHost} updateView={updateView} />;
        break;
      case "UserView":
        view = <UserView serverHost={serverHost} updateView={updateView} />;
        break;
      case "SessionView":
        view = <SessionView serverHost={serverHost} updateView={updateView} />;
        break;
      case "InstructionsView":
        view = (
          <InstructionsView serverHost={serverHost} updateView={updateView} />
        );
        break;
      default:
        view = `Error loading page: ${viewKey}`;
    }
    setCurrentView(view);
  }, [viewKey]);
  return <div className="App">{currentView}</div>;
}

export default App;
