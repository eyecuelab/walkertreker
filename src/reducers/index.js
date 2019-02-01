import stepReducer from './stepReducer';
import demoReducer from './demoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  steps: stepReducer,
  demo: demoReducer
});

export default rootReducer;
