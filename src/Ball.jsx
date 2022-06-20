import React from "react";
import styles from "./Ball.module.css";

const Ball = (t, l) => {
  console.log(t, l);
  return <div className={styles.ball} style={{ top: t, left: l }} />;
};

export default Ball;
