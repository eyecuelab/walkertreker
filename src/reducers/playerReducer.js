import { v4 } from 'uuid';
import constants from '../constants';
const { c, storeData, retrieveData } = constants;
const initialState = {
  playerId: null,
  displayName: null,
  phoneNumber: null,
  campaignId: null,
};
let newState;

export default (state = initialState, action) => {
  switch (action.type) {

    case c.CREATE_PLAYER:
      const playId = v4();
      newState = {
        ...state,
        displayName: action.name,
        phoneNumber: action.number,
        playerId: playId,
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    case c.SEND_JOIN_CAMPAIGN_REQUEST:
      newState = {
        ...state,
        campaignId: action.campId
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    default:
      return state;
    }
}
