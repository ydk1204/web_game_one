import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from "./Enemy.module.css";
import { enemyMove, enemyDie } from "./module/enemyLocations";

const DELETEOBJECT = "enemys";

const Enemy = ({ index, arr, pos, delfn, stateArr }) => {
  // 적이 위에서 부터 아래로 내려오기
  const Enemy = useRef();
  const [EnemyLocation, setEnemyLocation] = useState(pos);
  const [visible, setVisible] = useState(false);

  let interval;
  const dispatch = useDispatch();

  const value = useSelector((state) => state.ballLocation);

  const changeEnemyPos = () => {
    const enemy = Enemy && Enemy.current;
    if (enemy !== null) {
      moveEnemy();
      dispatch(enemyMove(index, arr, EnemyLocation));
      enemy.style.top = EnemyLocation.x + "px";
      enemy.style.left = EnemyLocation.y + "px";
    }
  };

  const moveEnemy = () => {
    let vx = EnemyLocation.x + 10;
    let newEnemy = EnemyLocation;
    newEnemy.x = vx;
    setEnemyLocation(newEnemy);
  };

  useEffect(() => {
    if (value !== undefined) {
      for (let ball of value) {
        let distancX = Math.pow(EnemyLocation.x - ball.x, 2);
        let distancY = Math.pow(EnemyLocation.y - ball.y, 2);
        // 공 사이의 간격
        let After = {
          MoveBetween: Math.sqrt(distancX + distancY),
          Between: 50 + 75,
        };
        // 공이 맞닿는 경우 사라짐
        if (After.MoveBetween < After.Between && !visible) {
          delfn(DELETEOBJECT, index);
          setVisible(true);
          // onVisible();
          // console.log("네~ 충돌했습니다.");
        }
      }
    }
  }, [value]);

  useEffect(() => {
    const enemy = Enemy.current;
    if (!visible) {
      interval = setInterval(changeEnemyPos, 50);
      // console.log("인터벌 실행");
    } else {
      dispatch(enemyDie(index, arr, null));
      clearInterval(interval);
      // console.log("인터벌 중지");
    }
    setEnemyLocation(pos);

    enemy.style.top = pos.x + "px";
    enemy.style.left = pos.y + "px";

    setTimeout(() => {
      clearInterval(interval);
      // onVisible();
    }, 3000);

    return;
  }, [visible]);

  // 적이 아래로 내려왔을 때 지금은 일정 시간 뒤에 사라지게 만들었지만
  // intersectionObserver 이용해서 화면 영역을 벗어났을 때 사라지도록 만들기

  return <div ref={Enemy} className={styles.enemy} />;
};

export default Enemy;
