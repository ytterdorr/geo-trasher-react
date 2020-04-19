import React from "react";

const SessionDetails = (props) => {
  const back = () => {
    props.back();
  };

  const getDateAndTimes = () => {
    let dataset = props.data.data;
    console.log("[getDate] dataset:", dataset);
    let validDate;
    // Check first element
    if (dataset[0][3]) validDate = dataset[0][3];
    //Check if second element
    if (dataset[1]) if (dataset[1][3]) validDate = dataset[1][3];

    if (!validDate) {
      validDate = "Could not read date";
      return validDate;
    } else {
      // validDate = validDate.slice(0, 10);
      let [date, startTime] = validDate.split(" ");
      console.log("Date:", date, "time", startTime);
      // return validDate;
      let endTime = dataset[dataset.length - 1][3].split(" ")[1];
      return (
        <p>
          Date{date} <br />
          Start time: {startTime} <br />
          End time: {endTime}
        </p>
      );
    }
    console.log(validDate);
  };

  return (
    <div style={styles.container}>
      <h3>Details: {props.data.sessionID}</h3>
      <button onClick={back}>Hide Details</button>
      <p>
        Short Info:
        <br />
        {getDateAndTimes()}
      </p>
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
                  <td key={"dt" + i}>{data}</td>
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
