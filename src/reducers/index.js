import campaignDetailReducer from './campaignDetailReducer';
import stepReducer from './stepReducer';
import demoReducer from './demoReducer';
import appStateReducer from './appStateReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // campaign: campaignDetailReducer,
  campaignDateArray: stepReducer,
  appState: appStateReducer,
  // demo: demoReducer,
});

export default rootReducer;
