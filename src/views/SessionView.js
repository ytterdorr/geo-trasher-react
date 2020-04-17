import React, { Component } from "react";
import Card from "../components/Card/Card";
import DownloadDataButton from "../components/DownloadData/DownloadDataButton";
import ClickHandler from "../components/ClickHandler/ClickHandler";

class SessionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: {
        Nikotin: 0,
        Annat: 0,
      },
      itemTypes: ["Nikotin", "Annat"],
    };
    this.handleEndSession = this.handleEndSession.bind(this);
    this.getSessionId = this.getSessionId.bind(this);
    this.addItem = this.addItem.bind(this);
    this.saveByNumClicks = this.saveByNumClicks.bind(this);
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
    let date = this.getUTCDate(Date(pos.timestamp));
    // console.log(date);
    return pos;
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

  handleEndSession = function () {
    sessionStorage.setItem("sessionID", 0);
    if (
      !localStorage.GeoTrashName ||
      localStorage.GeoTrashName === "Anonymous"
    ) {
      this.props.updateView("FirstView");
    } else {
      this.props.updateView("UserView");
    }
  };

  getSessionId = async () => {
    let sessionID = await (
      await fetch(`${this.props.serverHost}/start_session`)
    ).json();
    sessionStorage.setItem("sessionID", sessionID);
  };

  componentDidMount() {
    // document.addEventListener("keydown", this.handleKeyDown);
    // document.addEventListener("keyup", this.handleKeyUp);
    this.getSessionId();
    if (!sessionStorage.items) {
      let items = { list: [], counter: { Nikotin: 0, Annat: 0 } };
      sessionStorage.setItem("items", JSON.stringify(items));

      this.addItem("Start");
    }
    let itemCount = JSON.parse(sessionStorage.items).counter;
    this.setState({ itemCount: itemCount });
  }

  componentWillUnmount() {
    // document.removeEventListener("keydown", this.handleKeyDown);
    // document.removeEventListener("keyup", this.handleKeyUp);
    sessionStorage.setItem("sessionID", 0);
    // console.log(sessionStorage.items);
    sessionStorage.setItem("items", "");
  }

  render() {
    return (
      <div id="">
        <ClickHandler sendNumClicks={this.saveByNumClicks} />
        <h1>
          Session,{" "}
          {localStorage.GeoTrashName ? localStorage.GeoTrashName : "Anonymous"}
        </h1>
        <button onClick={this.handleEndSession}>End session</button>
        <br />
        <Card>
          <h3>Plockat</h3>
          <p>
            Nikotin: {this.state.itemCount.Nikotin}
            <br />
            Annat: {this.state.itemCount.Annat}
          </p>
        </Card>
        {/* <button onClick={this.downloadAsCsv}>Download Session Data</button> */}
        <DownloadDataButton />
      </div>
    );
  }
}

export default SessionView;
