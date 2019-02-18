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


"id": "f3d977e8-9450-49e9-84cd-b0a1626b71b3",
"displayName": "Michael Jordan",
"phoneNumber": "+15035559900",
"inActiveGame": true,
"campaignId": "c6e88e6e-d8ea-42c3-977a-5fbda85e2e77",
"health": 100,
"hunger": 100,
"steps": [
