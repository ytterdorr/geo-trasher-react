import React, { useState } from "react";
import Card from "../Card/Card";
import Colors from "../../Colors";
const SigninSignup = (props) => {
  const [uNameVal, setUNameVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [errorMess, setErrorMess] = useState("");

  const handleUNameChange = (event) => {
    setUNameVal(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassVal(event.target.value);
  };

  const sendDetails = async (url) => {
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: uNameVal, password: passVal }),
    }).then((res) => res.json());
    return result;
  };

  const handleSignIn = async () => {
    let postUrl = `${props.serverHost}/sign_in`;
    let result = await sendDetails(postUrl);
    // .then((data) => data);
    setErrorMess(result.message);
    console.log(result);
    if (result.success) {
      // Store username and token on local storage
      localStorage.GeoTrashName = uNameVal;
      localStorage.token = result.data;
      props.updateView("UserView");
    }
  };

  const handleSignUp = async () => {
    let url = `${props.serverHost}/sign_up`;
    let result = await sendDetails(url);
    setErrorMess(result.message);
    console.log(result);
  };

  // Check updates
  // useEffect(() => {
  //   console.log(uNameVal);
  // }, [uNameval]);

  return (
    <Card style={styles.CardStyle}>
      <p style={styles.title}>Sign in / Sign up</p>
      <input
        id="signin-username"
        style={styles.input}
        label="username"
        placeholder="Username"
        value={uNameVal}
        onChange={handleUNameChange}
      ></input>
      <input
        id="signin-password"
        style={styles.input}
        type="password"
        placeholder="password"
        value={passVal}
        onChange={handlePassChange}
      ></input>
      <div style={styles.SignInSignUpHolder}>
        <button style={styles.Button} onClick={handleSignIn}>
          Sign in
        </button>
        <button style={styles.Button} onClick={handleSignUp}>
          Sign up
        </button>
      </div>
      <div>{errorMess}</div>
    </Card>
  );
};

const styles = {
  title: {
    marginTop: 0,
    marginBotton: 0,
    padding: 0,
    fontWeight: "bold",
  },
  SignInSignUpHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "5px",
  },
  input: {
    width: "100%",
  },
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
  },
};

export default SigninSignup;
