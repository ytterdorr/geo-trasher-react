import React from "react";
import "./Card.css";
import styles from "./CardStyles";
const Card = (props) => {
  return (
    <div
      // className={"Card " + props.className}
      style={{ ...styles.Card, ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default Card;
