import { combineReducers } from 'redux';
import { openedPageReducer, addTownReducer } from './test.js';

const allReducers = combineReducers({
  openedPageReducer: openedPageReducer,
  townsReducer: addTownReducer,
})

export default allReducers;
