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

  const setToggleDetail = (sessionID) => {
    const toggleDetail = () => {
      console.log("Toggle Detail:", sessionID);
      let tmpSessionData = sessionData;
      for (let session of tmpSessionData) {
        console.log(session.sessionID, session.showDetails);
        if (session.sessionID === sessionID) {
          session.showDetails = !session.showDetails;
          break;
        }
      }
      setSessionData(tmpSessionData);
    };
    return toggleDetail;
  };

  const showDetailsOnClick = (sessionID) => {
    const showDetails = () => {
      // console.log(sessionID);
      let data;
      for (let session of sessionData) {
        if (session.sessionID == sessionID) {
          data = session;
          // console.log(data);
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
      // console.log("userSessions:", userSessions);

      let totalItems = { Nikotin: 0, Annat: 0 };

      let sessionDivs = [];
      for (let session of userSessions) {
        // console.log(session.itemCount);
        // Replace data with
        session.showDetails = false;
        session.key = session.sessionID;
        // console.log(session);
        sessionDivs.push(session);
        // Add to total:
        if (session.itemCount.Nikotin)
          totalItems.Nikotin += session.itemCount.Nikotin;
        if (session.itemCount.Annat)
          totalItems.Annat += session.itemCount.Annat;
      }
      props.updateTotalItems(totalItems);
      setSessionData(sessionDivs.reverse());
      setIsLoading(false);
      console.log(sessionData);
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
        {
          isLoading ? (
            "Gettind data.."
          ) : (
            <Card style={{}}>
              {sessionData.map((session) => (
                <div
                  key={session.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderBottom: "1px solid black",
                    padding: 5,
                    width: "100%",
                  }}
                >
                  <div
                    className="sessionSummary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 5,
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "100px" }}>
                      {session.title}
                    </div>
                    <div style={{ flex: 1, minWidth: 100 }}>
                      Nicotine: {session.itemCount.Nikotin}
                      <br />
                      Other: {session.itemCount.Annat}
                    </div>
                    <button
                      style={{ flex: 1 }}
                      onClick={setToggleDetail(session.sessionID)}
                    >
                      Details
                    </button>
                  </div>
                  {session.showDetails ? <div>"Details!"</div> : null}
                </div>
              ))}
            </Card>
          )
          // (
          //   <table>
          //     <thead>
          //       <tr style={{ borderBottom: "1px solid black" }}>
          //         <th>Session name</th>
          //         <th>Objects</th>
          //         <th>Date</th>
          //         <th></th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {sessionData.map((session) => (
          //         // JSON.stringify(session.data)
          //         <tr>
          //           <td>{session.title}</td>
          //           <td>
          //             Nikotin: {session.itemCount.Nikotin}
          //             <br /> Annat: {session.itemCount.Annat}
          //           </td>
          //           <td>TODO: Date</td>
          //           <td>
          //             <button>Details</button>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // )

          // sessionData.map((session) => (
          //     <Card style={styles.card} key={session.sessionID}>
          //       <h4 style={styles.cardHeading}>{session.title}</h4>
          //       <p style={styles.cardText}>
          //         Nikotin: {session.itemCount.Nikotin} <br />
          //         Annat: {session.itemCount.Annat}
          //       </p>
          //       <button
          //         data-sessionid={session.sessionID}
          //         style={styles.button}
          //         onClick={showDetailsOnClick(session.sessionID)}
          //       >
          //         Details
          //       </button>
          //     </Card>
          //   ))
        }
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
