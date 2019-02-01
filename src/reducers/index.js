import stepReducer from './stepReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  steps: stepReducer,
});

export default rootReducer;
