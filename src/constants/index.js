import * as types from './actionTypes';
import initialStateStepReducer from './initialStates/initialStateStepReducer';
import initialStateDemoReducer from './initialStates/initialStateStepReducer';
import initialStateCampaignDetailReducer from './initialStates/initialStateStepReducer';
import fakeState from './fakeStateModel';

export default {
  c: types,
  initialState: {
    steps: initialStateStepReducer,
    campaignDetails: initialStateCampaignDetailReducer,
    demo: initialStateDemoReducer,
  },
  fakeState: fakeState,
};
