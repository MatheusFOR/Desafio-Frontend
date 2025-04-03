import { combineReducers } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';

const rootReducer = combineReducers({
  steps: stepsReducer,
});

export default rootReducer; 