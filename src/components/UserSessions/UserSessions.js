import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Colors from "../../styles/Colors";

const UserSessions = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState("");

  useEffect(() => {
    const getSessions = async () => {
      let username = localStorage.GeoTrashName;
      let userSessions = await fetch(
        `${props.serverHost}/user_sessions/${username}`
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      console.log(userSessions.message);
      userSessions = userSessions.data;

      let sessionDivs = [];
      for (let session of userSessions) {
        console.log(session.itemCount);

        sessionDivs.push(session);
      }
      setSessionData(sessionDivs.reverse());
      setIsLoading(false);
    };

    getSessions();
  }, [props.serverHost]);

  return (
    <div>
      <h1>My sessions</h1>
      <div className="sessionContainer" style={styles.sessionContainer}>
        {isLoading
          ? "Gettind data.."
          : sessionData.map((session) => (
              <Card style={styles.card} key={session.title}>
                <h4 style={styles.cardHeading}>{session.title}</h4>
                <p style={styles.cardText}>
                  Nikotin: {session.itemCount.Nikotin} <br />
                  Annat: {session.itemCount.Annat}
                </p>
                <button style={styles.button}>Details</button>
              </Card>
            ))}
      </div>
    </div>
  );
};

const styles = {
  sessionContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: Colors.standardBackground,
    margin: 5,
    padding: 10,
  },
  cardHeading: {
    padding: 0,
    margin: 0,
  },
  cardText: {
    margin: "5px",
  },
  button: {
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: Colors.blue,
  },
};

export default UserSessions;
