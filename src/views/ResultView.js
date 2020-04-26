import React from "react";
import MapContainer from "../components/MapContainer";
import Card from "../components/Card/Card";
import DownloadDataButton from "../components/DownloadData/DownloadDataButton";

const ResultView = (props) => {
  // Needs props: sessionName, itemTypes, itemCount, items

  const handleFinish = () => {
    sessionStorage.setItem("sessionID", 0);
    if (
      !localStorage.GeoTrashName ||
      localStorage.GeoTrashName === "Anonymous"
    ) {
      props.updateView("FirstView");
    } else {
      props.updateView("UserView");
    }
  };
  return (
    <div id="" style={props.styles.container}>
      <h1 style={props.styles.heading}>
        {props.sessionName ? props.sessionName : "Anonymous Session"}
      </h1>

      <br />
      <h3>Awesome job! You have picked:</h3>
      <Card style={{ padding: 20 }}>
        <p style={{ margin: 0 }}>
          <b>Picked Items</b> <br />
          {props.itemTypes.map((item, i) => {
            return (
              <React.Fragment>
                {item}: {props.itemCount[item]}
                <br />
              </React.Fragment>
            );
          })}
        </p>
      </Card>
      <br />
      <div
        id="MapHolder"
        style={{
          width: "400px",
          height: "300px",
          maxWidth: "100vw",
          backgroundColor: "gray",
        }}
      >
        <MapContainer
          sessionStorageItems={props.sessionStorageItems}
        ></MapContainer>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <DownloadDataButton itemList={props.sessionStorageItems.list} />
        <button
          style={{ marginLeft: "5vw", minWidth: "80px" }}
          onClick={handleFinish}
        >
          Done
        </button>
      </div>
    </div>
  );
};

const styles = {
  titleHolder: {
    display: "flex",
    flexDirection: "row",
  },
  buttonHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginBottom: 0,
  },
};

export default ResultView;
