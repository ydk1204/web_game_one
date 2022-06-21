import { useRef, useState, useEffect } from "react";
import styles from "./App.module.css";
import Ball from "./Ball";

function App() {
  const PLAYER = useRef();
  const [ballPos, setBallPos] = useState({});
  const [ballCount, setBallCount] = useState(5);
  const [ballArr, setBallArr] = useState([]);

  const mouseMoving = (e) => {
    const player = PLAYER.current;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    player.style.left = mouseX + "px";
    player.style.top = mouseY + "px";
  };

  const mouseClick = (e) => {
    if (ballCount === 0) return;
    setBallPos({ x: e.clientY, y: e.clientX });
    const newPos = [...ballArr, { x: e.clientY, y: e.clientX }];
    setBallArr(newPos);
    setBallCount((count) => count - 1);
  };

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
      {ballArr && ballArr.map((ball, index) => <Ball key={index} pos={ball} />)}
    </div>
  );
}

export default App;
