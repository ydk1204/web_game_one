import { combineReducers } from 'redux';
import ballLocation from "./ballLocations";
import enemyLocation from './enemyLocations';
import playerScore from './playerScore';

const rootReducer = combineReducers({
  ballLocation : ballLocation,
  enemyLocation: enemyLocation,
  playerScore : playerScore
});

export default rootReducer;