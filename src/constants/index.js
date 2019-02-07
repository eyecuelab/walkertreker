import * as types from './actionTypes';
import initialStateStepReducer from './initialStates/initialStateStepReducer';
import initialStateCampaignDetailReducer from './initialStates/initialStateStepReducer';
import fakeState from './fakeStateModel';

export default {
  c: types,
  initialState: {
    campaignDetails: initialStateCampaignDetailReducer,
    steps: initialStateStepReducer,
  },
  fakeState: fakeState,
};
