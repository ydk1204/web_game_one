import React, { useRef, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import styles from "./Enemy.module.css";

const Enemy = ({ pos, ballInfo }) => {
  // 적이 위에서 부터 아래로 내려오기
  const Enemy = useRef();
  const [EnemyLocation, setEnemyLocation] = useState(pos);
  const [visible, setVisible] = useState(true);

  const onVisible = () => {
    const enemy = Enemy && Enemy.current;
    if (enemy !== null) {
      enemy.style.display = "none";
      setVisible(false);
      return;
    }
    return;
  };

  const value = useSelector((state) => state);

  const changeEnemyPos = () => {
    const enemy = Enemy && Enemy.current;
    if (enemy !== null) {
      moveEnemy();
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
        if (After.MoveBetween < After.Between && visible) {
          console.log("충돌");
          onVisible();
        }
      }
    }
  }, [value]);

  useEffect(() => {
    const enemy = Enemy.current;
    const interval = setInterval(changeEnemyPos, 50);
    setEnemyLocation(pos);

    enemy.style.top = pos.x + "px";
    enemy.style.left = pos.y + "px";

    setTimeout(() => {
      clearInterval(interval);
      onVisible();
    }, 3000);

    return;
  }, []);

  // 적이 아래로 내려왔을 때 지금은 일정 시간 뒤에 사라지게 만들었지만
  // intersectionObserver 이용해서 화면 영역을 벗어났을 때 사라지도록 만들기

  return <div ref={Enemy} className={styles.enemy} />;
};

export default Enemy;
