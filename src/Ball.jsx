import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import styles from "./Ball.module.css";
import { ballmove } from "./module/ballLocations";

const DELETEOBJECT = "balls";

const Ball = ({ index, arr, pos, delfn, stateArr }) => {
  const Ball = useRef();
  const [ballLocation, setBallLocation] = useState(pos);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const value = useSelector((state) => state.enemyLocation);

  const changeBallPos = () => {
    const ball = Ball && Ball.current;
    if (ball !== null) {
      moveBall();
      dispatch(ballmove(index, arr, ballLocation));
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
    if (value !== undefined) {
      for (let enemy of value) {
        if (enemy === null) return;
        let distancX = Math.pow(ballLocation.x - enemy.x, 2);
        let distancY = Math.pow(ballLocation.y - enemy.y, 2);
        // 공 사이의 간격
        let After = {
          MoveBetween: Math.sqrt(distancX + distancY),
          Between: 50 + 75,
        };
        // 공이 맞닿는 경우 사라짐
        if (After.MoveBetween < After.Between && !visible) {
          console.log("충돌");
          delfn(DELETEOBJECT, index);
          setVisible(true);
          // onVisible();
        }
      }
    }
  }, [value]);

  useEffect(() => {
    const ball = Ball.current;
    const interval = setInterval(() => {
      if (!visible) {
        changeBallPos();
      } else {
        clearInterval(interval);
      }
    }, 10);
    setBallLocation(pos);

    ball.style.top = pos.x + "px";
    ball.style.left = pos.y + "px";

    setTimeout(() => {
      clearInterval(interval);
      // onVisible();
    }, 1000);

    return;
  }, [visible]);

  return <div ref={Ball} className={styles.ball} />;
};

export default Ball;
