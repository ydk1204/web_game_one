import { useRef, useState } from "react";
import styles from "./App.module.css";
import Ball from "./Ball";

function App() {
  const PLAYER = useRef();
  const [isShooting, setIsShooting] = useState(false);
  const [ballPos, setBallPos] = useState({});

  const mouseMoving = (e) => {
    const player = PLAYER.current;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    player.style.left = mouseX + "px";
    player.style.top = mouseY + "px";
  };

  const mouseClick = (e) => {
    console.log(e.clientX, e.clientY);
    setBallPos({ x: e.clientX, y: e.clientY });
    setIsShooting((shooting) => !shooting);
    setTimeout(() => {
      setIsShooting(false);
    }, 3000);
  };

  return (
    <div className={styles.canvas} onMouseMove={(e) => mouseMoving(e)}>
      <h1>hello world</h1>
      <div
        className={styles.player}
        ref={PLAYER}
        onClick={(e) => mouseClick(e)}
      ></div>
      {isShooting ? ballPos && <Ball t={ballPos.x} l={ballPos.y}></Ball> : null}
    </div>
  );
}

export default App;
