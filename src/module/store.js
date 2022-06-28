import { combineReducers } from 'redux';
import ballLocation from "./ballLocations";
import enemyLocation from './enemyLocations';

const rootReducer = combineReducers({
  ballLocation : ballLocation,
  enemyLocation : enemyLocation
});

export default rootReducer;