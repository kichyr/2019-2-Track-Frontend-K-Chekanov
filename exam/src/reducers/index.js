import { combineReducers } from 'redux';
import { openedWeatherReducer, addTownReducer } from './test.js';

const allReducers = combineReducers({
  openedWeatherReducer: openedWeatherReducer,
  townsReducer: addTownReducer,
})

export default allReducers;
