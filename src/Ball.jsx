import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import styles from "./Ball.module.css";
import { ballmove1 } from "./module/store";

const Ball = ({ index, arr, pos }) => {
  const Ball = useRef();
  const [ballLocation, setBallLocation] = useState(pos);

  const dispatch = useDispatch();

  const changeBallPos = () => {
    const ball = Ball && Ball.current;
    if (ball !== null) {
      moveBall();
      dispatch(ballmove1(index, arr, ballLocation));
      ball.style.top = ballLocation.x + "px";
      ball.style.left = ballLocation.y + "px";
    }
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
