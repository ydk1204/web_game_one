const ENEMYLOCATION = "ENEMYLOCATION";
const ENEMYDIE = "ENEMYDIE";

const initialArray = [];

export const enemyMove = (num, arr, pos) => ({
  type: ENEMYLOCATION,
  num,
  arr,
  pos
});

export const enemyDie = (index, arr) => ({
  type: ENEMYDIE,
  index,
  arr,
})

export default function enemyLocation(currentEnemy = initialArray, action) {
  

  switch (action.type) {
    case ENEMYLOCATION:
      if (action.arr === undefined) {
        currentEnemy = [];
      }
      else if (action.arr !== undefined) {
        currentEnemy = action.arr;
      }
      let newArr = [...currentEnemy];
      newArr[parseInt(action.num)] = action.pos;
      currentEnemy = newArr;
      return newArr;
    case ENEMYDIE:
      if (action.arr !== undefined) {
        currentEnemy = action.arr;
      }
      let newEnemyArr = [...currentEnemy];
      newEnemyArr.splice(action.index, 1);
      currentEnemy = newEnemyArr;
      return currentEnemy;
    default:
      return currentEnemy;
  }
}