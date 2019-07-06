import campaignReducer from './campaignReducer';
import stepReducer from './stepReducer';
import playerReducer from './playerReducer';
import redirectReducer from './redirectReducer';
import { combineReducers } from 'redux';
import eventReducer from './eventReducer';


// we'll need a new root reducer and rewritten reducers for saga
const rootReducer = combineReducers({
  campaign: campaignReducer,
  steps: stepReducer,
  player: playerReducer,
  redirect: redirectReducer,
  event: eventReducer,
});

export default rootReducer;
