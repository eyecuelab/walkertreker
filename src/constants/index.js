import * as types from './actionTypes';
import initialStateSteps from './initialStates/initialStateSteps';
import initialStateCampaign from './initialStates/initialStateCampaign';
import initialStatePlayer from './initialStates/initialStatePlayer';

import fakeState from './fakeStateModel';
import { storeData, retrieveData } from './asyncStorage'

export default {
  c: types,
  initialState: {
    campaign: initialStateCampaign,
    steps: initialStateSteps,
    player: initialStatePlayer,
  },
  storeData,
  retrieveData,
};
