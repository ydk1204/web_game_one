import React, { useRef, useEffect, useState } from "react";
import styles from "./Enemy.module.css";

const Enemy = ({ pos, ballInfo }) => {
  // 적이 위에서 부터 아래로 내려오기
  const Enemy = useRef();
  const [EnemyLocation, setEnemyLocation] = useState(pos);

  console.log(ballInfo);

  const changeEnemyPos = () => {
    const enemy = Enemy && Enemy.current;
    moveEnemy();
    enemy.style.top = EnemyLocation.x + "px";
    enemy.style.left = EnemyLocation.y + "px";
  };

  const moveEnemy = () => {
    let vx = EnemyLocation.x + 10;
    let newEnemy = EnemyLocation;
    newEnemy.x = vx;
    setEnemyLocation(newEnemy);
  };

  useEffect(() => {
    const enemy = Enemy.current;
    const interval = setInterval(changeEnemyPos, 50);
    setEnemyLocation(pos);

    enemy.style.top = pos.x + "px";
    enemy.style.left = pos.y + "px";

    setTimeout(() => {
      enemy.style.display = "none";
      clearInterval(interval);
    }, 2000);

    return;
  }, []);

  // 적이 아래로 내려왔을 때 지금은 일정 시간 뒤에 사라지게 만들었지만
  // intersectionObserver 이용해서 화면 영역을 벗어났을 때 사라지도록 만들기

  return <div ref={Enemy} className={styles.enemy} />;
};

export default Enemy;
