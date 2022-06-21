import React, { useEffect, useRef, useState } from "react";
import styles from "./Ball.module.css";

const Ball = ({ pos }) => {
  let { x, y } = pos;
  const Ball = useRef();
  const [ballLocationX, setBallLocationX] = useState();

  useEffect(() => {
    const ball = Ball.current;
    setTimeout(() => {
      ball.style.display = "none";
    }, 1000);
  }, []);

  return (
    <div
      ref={Ball}
      className={styles.ball}
      style={{ top: x + "px", left: y + "px" }}
    />
  );
};

export default Ball;
