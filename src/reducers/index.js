import campaignDetailReducer from './campaignDetailReducer';
import stepReducer from './stepReducer';
import demoReducer from './demoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  campaign: campaignDetailReducer,
  steps: stepReducer,
  demo: demoReducer,
});

export default rootReducer;
