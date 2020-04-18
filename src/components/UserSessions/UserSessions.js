import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Colors from "../../styles/Colors";
import SessionDetails from "../SessionDetails/SessionDetails";

const UserSessions = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [detailData, setDetailData] = useState("");

  const backFromDetails = () => {
    setDetailView(false);
  };

  const showDetailsOnClick = (sessionID) => {
    const showDetails = () => {
      // setDetailSessionNumber(sessionID);
      let data;
      for (let session of sessionData) {
        if (session.sessionID == sessionID) {
          data = session;
          console.log(data);
          break;
        }
      }
      if (!data) {
        console.log("[showDetails] Error when searching by sessionID");
        return;
      }
      setDetailData(data);
      setDetailView(true);
    };
    return showDetails;
  };

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
      // console.log(userSessions.message);
      userSessions = userSessions.data;

      let sessionDivs = [];
      for (let session of userSessions) {
        // console.log(session.itemCount);

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

      {detailView ? (
        <SessionDetails back={backFromDetails} data={detailData} />
      ) : null}
      <div className="sessionContainer" style={styles.sessionContainer}>
        {isLoading
          ? "Gettind data.."
          : sessionData.map((session) => (
              <Card style={styles.card} key={session.sessionID}>
                <h4 style={styles.cardHeading}>{session.title}</h4>
                <p style={styles.cardText}>
                  Nikotin: {session.itemCount.Nikotin} <br />
                  Annat: {session.itemCount.Annat}
                </p>
                <button
                  data-sessionid={session.sessionID}
                  style={styles.button}
                  onClick={showDetailsOnClick(session.sessionID)}
                >
                  Details
                </button>
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
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.standardBackground,
    margin: 5,
    padding: 10,
    width: 100,
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
