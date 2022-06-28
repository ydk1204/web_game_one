const BALLMOVE = "BALLMOVE";

const initialState = [];

export const ballmove = (num, arr, pos) => ({
  type: BALLMOVE,
  num,
  arr,
  pos
});

export default function ballLocation(currentState = initialState, action) {
  switch (action.type) {
    case BALLMOVE:
      if (action.arr === undefined) {
        currentState = [];
      }
      else if (action.arr !== undefined) {
        currentState = action.arr;
      }
      let newArr = [...currentState];
      newArr[parseInt(action.num)] = action.pos;
      currentState = newArr;
      return newArr;
    default:
      return currentState;
  }
}