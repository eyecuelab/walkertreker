import campaignDetailReducer from './campaignDetailReducer';
import stepReducer from './stepReducer';
import appStateReducer from './appStateReducer';
import { combineReducers } from 'redux';


// we'll need a new root reducer and rewritten reducers for saga
const rootReducer = combineReducers({
  campaign: campaignDetailReducer,
  steps: stepReducer,
  appState: appStateReducer,
});

export default rootReducer;
