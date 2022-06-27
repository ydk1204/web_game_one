// import { combineReducers } from 'redux';
// import ballLocation from "./ballLocation";

// const rootReducer = combineReducers({ ballLocation });

const BALLMOVE1 = "BALLMOVE";

export const ballmove1 = (num, arr, pos) => ({
  type: BALLMOVE1,
  num,
  arr,
  pos
});

function rootReducer(currentState, action) {
  if (action.arr === undefined) {
    currentState = [];
  }
  else if (action.arr !== undefined) {
    currentState = action.arr;
  }
  // console.log(action.pos)
  let newArr = [...currentState];
  switch (parseInt(action.num)) {
    case 0:
      newArr[0] = action.pos;
      currentState = newArr;
      return currentState;
    case 1:
      
      newArr[1] = action.pos;
      currentState = newArr;
      return newArr;
    case 2:
      
      newArr[2] = action.pos;
      currentState = newArr;
      return newArr;
    case 3:
      
      newArr[3] = action.pos;
      currentState = newArr;
      return newArr;
    case 4:
      
      newArr[4] = action.pos;
      currentState = newArr;
      return newArr;
    default:
      const notValue = "값 없음";
      return notValue;
  }
}

// newArr[1] = action.pos;

export default rootReducer;