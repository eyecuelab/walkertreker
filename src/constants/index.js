import * as types from './actionTypes';
import * as items from './itemImages';
import initialStateSteps from './initialStates/initialStateSteps';
import initialStateCampaign from './initialStates/initialStateCampaign';
import initialStatePlayer from './initialStates/initialStatePlayer';
import initialStateAuth from './initialStates/initialStateAuth';
import { storeData, retrieveData } from './asyncStorage';
import { NAVIGATION as navigation } from './navigation';
import events from './events';

export default {
  c: types,
  initialState: {
    campaign: initialStateCampaign,
    steps: initialStateSteps,
    player: initialStatePlayer,
    auth: initialStateAuth,
  },
  storeData,
  retrieveData,
  item: items,
  navigation,
  events,
};
