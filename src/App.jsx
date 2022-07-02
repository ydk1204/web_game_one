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

  const [ballStateArr, setBallStateArr] = useState([0, 0, 0, 0, 0]);
  const [enemyStateArr, setEnemyStateArr] = useState([0, 0, 0, 0, 0]);

  const value = useSelector((state) => state.enemyLocation);
  // console.log(value);

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

  // 삭제 함수
  const onDeleteBall = (objName, index) => {
    switch (objName) {
      case "balls":
        console.log("삭제 함수 실행");
        const newArrBall = ballArr;
        newArrBall.splice(index, 1);
        setBallArr(newArrBall);
        break;
      default:
        console.log("값이 없어요");
        break;
    }
  };

  const onDeleteEnemy = (objName, index) => {
    switch (objName) {
      case "enemys":
        const newArrEnemy = enemyArr;
        newArrEnemy.splice(index, 1, null);
        setEnemyArr(newArrEnemy);
        break;
      default:
        console.log("값이 없어요");
        break;
    }
  };

  // 해당 useEffect 부터 createEnemy까지 적 만드는 함수
  // 적 생성 함수
  const createEnemy = () => {
    const count = enemyArr.length;
    console.log(enemyCount);
    // console.log("생성");
    if (enemyCount >= 0) {
      const x = Math.floor(Math.random() * 50) + -50;
      const y = Math.floor(Math.random() * 600) + 100;
      const newEnemy = [...enemyArr, { x, y }];
      setEnemyArr(newEnemy);
      const count = enemyCount - 1;
      setEnemyCount(count);
    }
  };

  useEffect(() => {
    // 적이 5명 이상 소환되어 있다면 2초 뒤 자동 초기화
    // 나중에 플레이어 점수 감소 혹은 게임 오버 형식으로 바꾸기
    if (enemyCount === 0) {
      setTimeout(() => {
        setEnemyArr([]);
        setEnemyCount(5);
      }, 2000);
      return;
    }
    setTimeout(() => {
      createEnemy();
    }, Math.floor(Math.random() * 1000) + 500);
  }, [enemyCount]);

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
          <Ball
            key={index}
            index={index}
            arr={ballArr}
            pos={ball}
            stateArr={enemyStateArr}
            delfn={onDeleteBall}
          />
        ))}
      {enemyArr &&
        enemyArr.map((enemy, index) =>
          enemy !== null ? (
            <Enemy
              key={index}
              index={index}
              arr={enemyArr}
              pos={enemy}
              stateArr={ballStateArr}
              delfn={onDeleteEnemy}
            />
          ) : null
        )}
    </div>
  );
}

export default App;
