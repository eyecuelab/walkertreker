import { v4 } from 'uuid';
import constants from '../constants';
const { c, storeData, retrieveData, initialState: { player } } = constants;
let newState;

export default (state = player, action) => {
  switch (action.type) {

    case c.PLAYER_CREATED:
      newState = Object.assign({}, state, action.player)
      console.log(newState);
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    case c.SEND_JOIN_CAMPAIGN_REQUEST:
      newState = {
        ...state,
        campaignId: action.campId
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    case c.PLAYER_UPDATED:
      newState = action.player;
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    default:
      return state;
    }
}
