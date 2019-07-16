import { combineReducers } from 'redux';
import campaignReducer from './campaignReducer';
import stepReducer from './stepReducer';
import playerReducer from './playerReducer';
import redirectReducer from './redirectReducer';
import eventReducer from './eventReducer';
import appState from './appStateReducer';
import invitationReducer from './invitationReducer';
import authReducer from './authReducer';


// we'll need a new root reducer and rewritten reducers for saga
const rootReducer = combineReducers({
  campaign: campaignReducer,
  steps: stepReducer,
  player: playerReducer,
  redirect: redirectReducer,
  event: eventReducer,
  appState: appState,
  invitations: invitationReducer,
  auth: authReducer,
});

export default rootReducer;