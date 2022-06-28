const ENEMYLOCATION = "ENEMYLOCATION";

const initialArray = [];

export const enemyMove = (num, arr, pos) => ({
  type: ENEMYLOCATION,
  num,
  arr,
  pos
});

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
    default:
      return currentEnemy;
  }
}