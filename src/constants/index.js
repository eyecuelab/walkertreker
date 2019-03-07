import * as types from './actionTypes';
import initialStateSteps from './initialStates/initialStateSteps';
import initialStateCampaign from './initialStates/initialStateCampaign';
import initialStatePlayer from './initialStates/initialStatePlayer';
import { storeData, retrieveData } from './asyncStorage';
import { NAVIGATION as navigation } from './navigation';

export default {
  c: types,
  initialState: {
    campaign: initialStateCampaign,
    steps: initialStateSteps,
    player: initialStatePlayer,
  },
  storeData,
  retrieveData,
  navigation,
};
