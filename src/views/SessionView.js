import React, { Component } from "react";
import Card from "../components/Card/Card";

class SessionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastKeyUp: 0,
      lastKeyDown: 0,
      clickType: "single",
      doubleClickTime: 600,
      timerRunning: false,
      itemCount: {
        Nikotin: 0,
        Annat: 0,
      },
    };
    this.handleEndSession = this.handleEndSession.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.startSendTimer = this.startSendTimer.bind(this);
    this.getSessionId = this.getSessionId.bind(this);
    this.addItem = this.addItem.bind(this);
    this.downloadAsCsv = this.downloadAsCsv.bind(this);
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
    console.log(date);
    return pos;
  };

  addItem = async (itemType) => {
    // Store item in session storage
    // Item info is stored as lists.
    // [type, latitude, longitude, time, sessionID]
    let position = await this.getPosition();
    let timestamp = this.getUTCDate();
    // let item = {
    //   type: itemType,
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude,
    //   timestamp: timestamp,
    //   sessionID: sessionStorage.sessionID,
    // };
    let item = [
      itemType,
      position.coords.latitude,
      position.coords.longitude,
      timestamp,
      sessionStorage.sessionID,
    ];
    console.log(item);
    let sessionItems = JSON.parse(sessionStorage.items);
    sessionItems.list.push(item);
    sessionItems.counter[itemType] += 1;

    sessionStorage.setItem("items", JSON.stringify(sessionItems));
    console.log(sessionItems);

    // Update State
    this.setState({ itemCount: sessionItems.counter });
  };

  startSendTimer() {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      setTimeout(() => {
        let itemType = "error";
        if (this.state.clickType === "single") {
          itemType = "Nikotin";
        } else if (this.state.clickType === "double") {
          itemType = "Annat";
        }
        this.addItem(itemType);
        this.setState({ timerRunning: false });
      }, this.state.doubleClickTime);
    }
  }

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

  handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log("Down", event.key);
      // Some shorter names
      let now = Date.now();
      let lastDown = this.state.lastKeyDown;
      let lastUp = this.state.lastKeyUp;
      let doubleClick = this.state.doubleClickTime;
      // check double click
      if (now - lastDown < doubleClick && lastUp > lastDown) {
        console.log("Double Click!");
        this.setState({ clickType: "double" });
      }
      // Check new single click
      else if (now - lastDown > doubleClick) {
        console.log("New click");
        this.setState({ clickType: "single" });
        this.startSendTimer();
      }
      this.setState({ lastKeyDown: now });
    }
  }

  handleKeyUp(event) {
    if (event.key === "Enter") {
      let now = Date.now();
      if (now - this.state.lastKeyUp > this.state.doubleClickTime) {
        console.log("new up");
        this.setState({ lastKeyUp: now });
      }
    }
  }

  getSessionId = async () => {
    let sessionID = await (
      await fetch(`${this.props.serverHost}/start_session`)
    ).json();
    sessionStorage.setItem("sessionID", sessionID);
  };

  downloadAsCsv() {
    let headers = [["Type", "Latitude", "Longitude", "DateTime", "SessionID"]];
    let data = JSON.parse(sessionStorage.items).list;
    let arr = headers.concat(data);
    let csvContent = arr.map((e) => e.join(",")).join("\n");
    this.download("datafile.csv", csvContent);
  }

  download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
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
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    sessionStorage.setItem("sessionID", 0);
    console.log(sessionStorage.items);
    sessionStorage.setItem("items", "");
  }

  render() {
    return (
      <div id="">
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
        <button onClick={this.downloadAsCsv}>Download Session Data</button>
      </div>
    );
  }
}

export default SessionView;
