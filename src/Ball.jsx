import React, { useEffect, useRef, useState } from "react";
import styles from "./Ball.module.css";

const Ball = ({ pos }) => {
  const Ball = useRef();
  const [ballLocation, setBallLocation] = useState(pos);

  const changeBallPos = () => {
    const ball = Ball && Ball.current;
    moveBall();
    ball.style.top = ballLocation.x + "px";
    ball.style.left = ballLocation.y + "px";
  };

  const moveBall = () => {
    let vx = ballLocation.x - 10;
    let newBall = ballLocation;
    newBall.x = vx;
    setBallLocation(newBall);
  };

  useEffect(() => {
    const ball = Ball.current;
    const interval = setInterval(changeBallPos, 10);
    setBallLocation(pos);

    ball.style.top = pos.x + "px";
    ball.style.left = pos.y + "px";

    setTimeout(() => {
      ball.style.display = "none";
      clearInterval(interval);
    }, 1000);

    return;
  }, []);

  return <div ref={Ball} className={styles.ball} />;
};

export default Ball;
