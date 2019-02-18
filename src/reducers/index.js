import campaignDetailReducer from './campaignDetailReducer';
import stepReducer from './stepReducer';
import appStateReducer from './appStateReducer';
import playerReducer from './playerReducer';
import { combineReducers } from 'redux';


// we'll need a new root reducer and rewritten reducers for saga
const rootReducer = combineReducers({
  campaign: campaignDetailReducer,
  steps: stepReducer,
  appState: appStateReducer,
  player: playerReducer,
});

export default rootReducer;
