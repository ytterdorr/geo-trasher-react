import React, { useState, useEffect } from "react";
import axios from "axios";

import "./DataDisplay.css";
import Card from "../Card/Card";
import Colors from "../../styles/Colors";
// Display data,
// And a button to refresh

const DataDisplay = (props) => {
  const [itemCount, setItemCount] = useState({ nikotin: 0, annat: 0 });
  const [isLoading, setIsLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(true);

  const serverHost = props.serverHost;
  // const serverHost = "http://localhost:5000";
  const getSessionItemCount = () => {
    setIsLoading(true);
    // const getUrl = `https://ytterdorr.pythonanywhere.com/get_session_item_count/${props.sessionID}`
    const getUrl = `${serverHost}/get_session_item_count/${props.sessionID}`;
    axios.get(getUrl).then((result) => {
      let data = result.data;
      console.log(data);
      setItemCount({ nikotin: data.Nikotin, annat: data.Annat });
      setIsLoading(false);
    });
  };

  // Run once
  useEffect(() => {
    console.log("[DataDisplay] use effect");
    if (isLoading) {
      getSessionItemCount();
    }
  }, [isLoading]);

  return (
    <Card style={{ ...styles.CardStyle, ...props.style }}>
      <div className="data-display-holder">
        <h4 className="card-title">Plockade Saker</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Nikotin: {itemCount.nikotin} <br />
            Annat: {itemCount.annat}
          </p>
        )}
        <button type="button" onClick={getSessionItemCount}>
          Press for data
        </button>
      </div>
    </Card>
  );
};

const styles = {
  CardStyle: {
    backgroundColor: Colors.defaultBackground,
  },
};

export default DataDisplay;
