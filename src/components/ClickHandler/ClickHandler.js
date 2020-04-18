import { Component } from "react";
class ClickHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastKeyUp: 0,
      lastKeyDown: 0,
      clickType: "single",
      numClicks: 0,
      doubleClickTime: 600,
      timerRunning: false,
      timer: null,
      useAdvanced: false,
    };
    // Bind methods
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.startSendTimer = this.startSendTimer.bind(this);
    this.onTimeUp = this.onTimeUp.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.advancedDown = this.advancedDown.bind(this);
    this.advancedUp = this.advancedUp.bind(this);
  }
  startSendTimer() {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      setTimeout(() => {
        this.onTimeUp();
        this.setState({ timerRunning: false });
      }, this.state.doubleClickTime);
    }
  }

  onTimeUp() {
    // console.log("Time Up");
    // console.log("numClicks: ", (() => this.state.numClicks)());
    this.props.sendNumClicks(this.state.numClicks);
    this.setState({ numClicks: 0 });
  }

  setTimer() {
    this.setState({
      timer: setTimeout(this.onTimeUp, 1000),
    });
  }

  advancedDown(event) {
    if (event.key === "Enter") {
      // console.log("advanced Down", event.key);
      // Some shorter names
      let now = Date.now();
      let lastDown = this.state.lastKeyDown;
      let doubleClick = this.state.doubleClickTime;
      // check double click
      console.log("timeDiff:", now - lastDown);
      if (now - lastDown < doubleClick && now - lastDown > 80) {
        // console.log("Double click!");
        let numClicks = this.state.numClicks + 1;
        this.setState({
          clickType: "double",
          numClicks: numClicks,
        });
        console.log("Add click:", this.state.numClicks);
        clearTimeout(this.state.timer);
        this.setTimer();
      }
      // Check new single click
      else if (now - lastDown > doubleClick) {
        // console.log("New click");
        this.setState({ clickType: "single", numClicks: 1 });
        this.setTimer();
      }
      this.setState({ lastKeyDown: now });
    }
  }

  handleKeyDown(event) {
    if (this.state.useAdvanced) {
      this.advancedDown(event);
      return;
    }
    if (event.key === "Enter") {
      // console.log("Down");
      // Some shorter names
      let now = Date.now();
      let lastDown = this.state.lastKeyDown;
      let lastUp = this.state.lastKeyUp;
      let doubleClick = this.state.doubleClickTime;
      // check double click
      if (now - lastDown < doubleClick && lastUp > lastDown) {
        // console.log("doubleClick!");
        this.setState({
          clickType: "double",
          numClicks: this.state.numClicks + 1,
        });
      }
      // Check new single click
      else if (now - lastDown > doubleClick) {
        // console.log("New click");
        this.setState({ clickType: "single", numClicks: 1 });
        this.startSendTimer();
      }
      this.setState({ lastKeyDown: now });
    }
  }

  advancedUp(event) {
    // console.log("advanced Up");
    if (event.key === "Enter") {
      let now = Date.now();
      this.setState({ lastKeyUp: now });
    }
  }

  handleKeyUp(event) {
    if (this.state.useAdvanced) {
      this.advancedUp(event);
      return;
    }
    if (event.key === "Enter") {
      // console.log("Up");
      let now = Date.now();
      if (now - this.state.lastKeyUp > this.state.doubleClickTime) {
        // console.log("new up");
        this.setState({ lastKeyUp: now });
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    // this.setState({ useAdvanced: true, doubleClickTime: 1000 });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    return "Clicker body";
  }
}

export default ClickHandler;
