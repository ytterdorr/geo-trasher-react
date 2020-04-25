import React, { Component } from "react";
import Card from "../components/Card/Card";
import DownloadDataButton from "../components/DownloadData/DownloadDataButton";
import ClickHandler from "../components/ClickHandler/ClickHandler";

class SessionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionName: "",
      itemCount: {
        Nikotin: 0,
        Annat: 0,
      },
      itemTypes: ["Nicotine", "Plastic", "Other"],
      sendingData: false,
      message: "",
      onScreenButtons: false,
    };
    this.handleEndSession = this.handleEndSession.bind(this);
    this.startSession = this.startSession.bind(this);
    this.addItem = this.addItem.bind(this);
    this.saveByNumClicks = this.saveByNumClicks.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
    this.setSessionName = this.setSessionName.bind(this);
    this.changeSessionName = this.changeSessionName.bind(this);
    this.toggleOnScreenButtons = this.toggleOnScreenButtons.bind(this);
    this.onScreenButtonSetter = this.onScreenButtonSetter.bind(this);
  }

  /// Get date
  // Takes a Date() object, or none.
  getUTCDate(timestamp = null) {
    return new Date().toISOString().replace("T", " ").split(".")[0];
  }

  getPosition = async () => {
    let pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    });
    return pos;
  };

  onScreenButtonSetter = (itemName) => {
    const onScreenButtonOnCLick = () => {
      this.addItem(itemName);
    };
    return onScreenButtonOnCLick;
  };

  saveByNumClicks(numClicks) {
    let itemTypes = this.state.itemTypes;
    // keep in bounds.
    if (numClicks - 1 > itemTypes.length) numClicks = itemTypes.length;
    let itemType = this.state.itemTypes[numClicks - 1];
    this.addItem(itemType);
  }

  addItem = async (itemType) => {
    // Store item in session storage
    // Item info is stored as lists.
    // [type, latitude, longitude, time, sessionID]
    let position = await this.getPosition();
    let timestamp = this.getUTCDate();
    let item = [
      itemType,
      position.coords.latitude,
      position.coords.longitude,
      timestamp,
      sessionStorage.sessionID,
    ];
    // console.log(item);
    let sessionItems = JSON.parse(sessionStorage.items);
    sessionItems.list.push(item);
    sessionItems.counter[itemType] += 1;

    sessionStorage.setItem("items", JSON.stringify(sessionItems));
    // console.log(sessionItems);

    // Update State
    this.setState({ itemCount: sessionItems.counter });
  };

  handleEndSession = async function () {
    let storeResult = await this.sendDataToServer().then((result) => result);
    console.log("StoreResult", storeResult);
    if (storeResult.success) {
      sessionStorage.setItem("sessionID", 0);
      if (
        !localStorage.GeoTrashName ||
        localStorage.GeoTrashName === "Anonymous"
      ) {
        this.props.updateView("FirstView");
      } else {
        this.props.updateView("UserView");
      }
    } else {
      console.log("Error sending data");
      this.setState({ message: "Error sending data, please try again." });
    }
  };

  setSessionName = async (sessionName) => {
    this.setState({ sessionName });
    console.log("sesisonName:", this.state.sessionName);
    sessionStorage.setItem("sessionName", sessionName);
    let url = `${this.props.serverHost}/update_session_name`;
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sessionID: sessionStorage.sessionID,
        newName: sessionName,
      }),
    }).then((res) => res.json());

    console.log(result);
  };

  changeSessionName() {
    let newName = window.prompt("New name", new Date().toDateString());
    if (newName) {
      this.setSessionName(newName);
    }
  }

  toggleOnScreenButtons() {
    this.setState({ onScreenButtons: !this.state.onScreenButtons });
  }

  startSession = async () => {
    // Check username
    if (!localStorage.GeoTrashName) {
      localStorage.setItem("GeoTrashName", "Anonymous");
    }
    let username = localStorage.GeoTrashName;

    // Get session ID
    let sessionID = await (
      await fetch(`${this.props.serverHost}/start_session/${username}`)
    ).json();
    sessionStorage.setItem("sessionID", sessionID);
    console.log("SessionID:", sessionID);

    // Set start item
    this.addItem("Start");

    // Set session name not already set.

    let sessionName = sessionStorage.sessionName
      ? sessionStorage.sessionName
      : `Session ${sessionID}`;
    this.setSessionName(sessionName);
  };

  sendDataToServer = async () => {
    this.setState({ sendingData: true, message: "sending data.." });
    let data = JSON.parse(sessionStorage.items).list;
    let url = `${this.props.serverHost}/dump_data`;
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: data }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });

    console.log("[SendData] Result:", result);
    this.setState({ sendingData: false, message: "" });
    return result;
  };

  componentDidMount = async () => {
    if (!sessionStorage.items) {
      this.startSession();

      // Initialize item list
      let counter = {};
      for (let item of this.state.itemTypes) {
        counter[item] = 0;
      }
      let items = { list: [], counter: counter };
      sessionStorage.setItem("items", JSON.stringify(items));
    }
    let itemCount = JSON.parse(sessionStorage.items).counter;
    let sessionName = sessionStorage.sessionName;
    this.setState({ itemCount, sessionName });
  };

  componentWillUnmount = async () => {
    let storeSuccess = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    })
      .then((result) => {
        // Clear session storage
        sessionStorage.setItem("sessionID", 0);
        sessionStorage.removeItem("items");
        sessionStorage.removeItem("sessionName");
      })
      .catch((error) => {
        console.log("Send not successful");
      });
  };

  render() {
    return (
      <div id="" style={styles.container}>
        <ClickHandler sendNumClicks={this.saveByNumClicks} />
        <h1 style={styles.heading}>
          {this.state.sessionName
            ? this.state.sessionName
            : "Anonymous Session"}
        </h1>
        <a href="#" onClick={this.changeSessionName}>
          Change Title
        </a>
        <div>{this.state.message}</div>

        <br />
        <Card style={{ padding: 20 }}>
          <p style={{ margin: 0 }}>
            <b>Picked Items</b> <br />
            {this.state.itemTypes.map((item) => {
              return (
                <React.Fragment>
                  {item}: {this.state.itemCount[item]}
                  <br />
                </React.Fragment>
              );
            })}
            {/* Nicotine: {this.state.itemCount.Nikotin}
            <br />
            Other: {this.state.itemCount.Annat} */}
          </p>
          <br />
          <a
            onClick={this.toggleOnScreenButtons}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Toggle Onscreen Buttons
          </a>
        </Card>
        {/* <button onClick={this.downloadAsCsv}>Download Session Data</button> */}
        <br />
        {this.state.onScreenButtons ? (
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: 80,
              justifyContent: "space-around",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            {this.state.itemTypes.map((item, i) => (
              <button
                key={i}
                style={{
                  width: "40%",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={this.onScreenButtonSetter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
        <DownloadDataButton />
        <br />
        <button onClick={this.handleEndSession}>End session</button>
      </div>
    );
  }
}

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

export default SessionView;
