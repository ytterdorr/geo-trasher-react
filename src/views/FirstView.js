import React from 'react';
import DataDisplay from '../components/DataDisplay/DataDisplay';
// import Card from "../components/Card/Card";
import SigninSignup from '../components/SigninSignup/SigninSignup';
import Colors from '../styles/Colors';
import logoImg from '../images/geoTrasherLogoTransBackground.png';
// What do I Want to present in this first view?
// Data-display
//

const FirstView = (props) => {
  const handleSessionButton = () => {
    props.updateView('SessionView');
  };

  const handleShowInstructions = () => {
    props.updateView('InstructionsView');
  };

  const handleMyPageButton = () => {
    props.updateView('UserView');
  };
  return (
    <div className='view-container'>
      {/* <h1>GeoTrasher!</h1> */}
      <img src={logoImg} style={{ maxWidth: '80vw', marginBottom: '2vh' }} />
      <DataDisplay
        serverHost={props.serverHost}
        sessionID='0'
        style={myStyles.CardStyle}
      />
      {localStorage.token ? (
        <button onClick={handleMyPageButton}>My Page</button>
      ) : (
        <SigninSignup
          serverHost={props.serverHost}
          updateView={props.updateView}
        />
      )}
      <button style={myStyles.Button} onClick={handleSessionButton}>
        Anonymous session
      </button>
      <a href='#' onClick={handleShowInstructions}>
        How to use this page
      </a>
      <p>This is a work in progress, made by Tore Haglund. </p>
      <a href='mailto: tore.haglund@gmail.com'>Send Feedback</a>
      <p>( Now with continuous integration :D )</p>
    </div>
  );
};

const myStyles = {
  CardStyle: {
    backgroundColor: Colors.defaultBackground,
    width: '150px',
    maxwidth: '80%',
    marginBottom: '10px',
    padding: '10px',
  },
  Button: {
    backgroundColor: Colors.blue,
    padding: '5px',
    marginBottom: '10px',
  },
};

export default FirstView;
