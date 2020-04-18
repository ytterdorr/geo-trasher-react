import React from "react";

const SessionDetails = (props) => {
  const back = () => {
    props.back();
  };

  return (
    <div style={styles.container}>
      <h3>Details: {props.data.sessionID}</h3>
      <button onClick={back}>Hide Details</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Latitud</th>
              <th>Longitude</th>
              <th>Time</th>
              <th>Session ID</th>
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((line, i) => (
              <tr key={`tr${i}`}>
                {line.map((data, i) => (
                  <td>{data}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default SessionDetails;
