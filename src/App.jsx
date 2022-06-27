import { useRef, useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import styles from "./App.module.css";
import Ball from "./Ball";
import Enemy from "./Enemy";

function App() {
  const PLAYER = useRef();
  const [ballPos, setBallPos] = useState({});
  const [enemyPos, setEnemyPos] = useState({});
  const [ballCount, setBallCount] = useState(5);
  const [enemyCount, setEnemyCount] = useState(5);
  const [ballArr, setBallArr] = useState([]);
  const [enemyArr, setEnemyArr] = useState([]);

  // 마우스 움직일 때마다 플레이어 표시
  const mouseMoving = (e) => {
    const player = PLAYER.current;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    player.style.left = mouseX + "px";
    player.style.top = mouseY + "px";
  };

  // 마우스 클릭 시 총알 날라가기
  const mouseClick = (e) => {
    if (ballCount === 0) return;
    setBallPos({ x: e.clientY, y: e.clientX });
    const newPos = [...ballArr, { x: e.clientY, y: e.clientX }];
    setBallArr(newPos);
    setBallCount((count) => count - 1);
  };

  // 해당 useEffect 부터 createEnemy까지 적 만드는 함수

  useEffect(() => {
    if (enemyCount === 0) {
      return;
    }
    setTimeout(() => {
      createEnemy();
    }, Math.floor(Math.random() * 3000) + 1500);
  }, [enemyCount]);

  const createEnemy = () => {
    if (enemyCount > 0) {
      const x = Math.floor(Math.random() * 50) + -50;
      const y = Math.floor(Math.random() * 600) + 100;
      const newEnemy = [...enemyArr, { x, y }];
      setEnemyArr(newEnemy);
      setEnemyCount((count) => count - 1);
    }
  };

  const updateBallInfo = (index, pos) => {
    const newArr = ballArr;
    newArr[index] = pos;
    setBallArr((arr) => newArr);
  };

  // 탄약 베열, 다 쓰면 초기화
  useEffect(() => {
    if (ballCount === 0) {
      setTimeout(() => {
        setBallArr([]);
        // 나중에 탄약 아이템 먹을 경우 추가되도록 변경
        setBallCount(5);
      }, 1000);
    }
    return;
  }, [ballCount]);

  return (
    <div className={styles.canvas} onMouseMove={(e) => mouseMoving(e)}>
      <h1>hello world {ballCount}</h1>
      <div
        className={styles.player}
        ref={PLAYER}
        onClick={(e) => mouseClick(e)}
      ></div>
      {ballArr &&
        ballArr.map((ball, index) => (
          <Ball key={index} index={index} arr={ballArr} pos={ball} />
        ))}
      {enemyArr &&
        enemyArr.map((enemy, index) => (
          <Enemy key={index} pos={enemy} ballInfo={ballArr} />
        ))}
    </div>
  );
}

export default App;
