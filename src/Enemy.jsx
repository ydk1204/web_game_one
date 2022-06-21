import React, { useEffect } from "react";
import styles from "./Enemy.module.css";

const Enemy = ({ pos }) => {
  let { x, y } = pos;

  useEffect(() => {});

  return (
    <div className={styles.enemy} style={{ top: x + "px", left: y + "px" }} />
  );
};

export default Enemy;
