import * as types from './actionTypes';
import initialStateStepReducer from './initialStates/initialStateStepReducer';
import initialStateCampaignDetailReducer from './initialStates/initialStateStepReducer';
import fakeState from './fakeStateModel';
import { storeData, retrieveData } from './asyncStorage'

export default {
  c: types,
  initialState: {
    campaignDetails: initialStateCampaignDetailReducer,
    steps: initialStateStepReducer,
  },
  storeData,
  retrieveData,
  fakeState: fakeState,
};
