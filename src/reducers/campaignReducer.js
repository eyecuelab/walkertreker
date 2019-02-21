import constants from '../constants';
const { c, initialState: { campaign } } = constants;
let newState;

export default (state = campaign, action) => {
  switch (action.type) {
  case c.SET_CAMPAIGN_LENGTH:
    return {
      ...state,
      length: action.length
    }
  case c.SET_DIFFICULTY:
    return {
      ...state,
      difficultyLevel: action.difficultyLevel
    }
  case c.SET_EVENT_FREQUENCY:
    return {
      ...state,
      randomEvents: action.randomEvents
    }
  case c.INITIAL_CAMPAIGN_DATA_RECEIVED:
    return {
      ...state,
      action.campaign
    }
  case c.INVITES_SENT:
    return {
      ...state,
      invited: action.invites,
    }
  case c.CAMPAIGN_INFO_RECEIVED:
    return {
      ...state,
      action.campaign,
    }
  case c.PLAYER_JOINED_CAMPAIGN: // should return the campaign, so refactor
    return {
      ...state,
      action.campaign,
    }
  case c.CAMPAIGN_UPDATED:
    return {
      ...state,
      action.campaign,
    }
  case c.CAMPAIGN_LEFT:
    return {
      ...state,
      action.campaign,
    }
  // case c.PLAYER_FETCHED: // should only be the person whose phone it is
  //   newState = Object.assign({}, state);
  //   newState.players.push(action.player);
  //   return newState;
  // case c.PLAYER_UPDATED: // should only be the person whose phone it is
  //   newState = Object.assign({}, state);
  //   const indexToUpdate = newState.players.findIndex(player => player.id === action.player.id);
  //   newState.players.splice(indexToUpdate, 1, action.player);
  //   return newState;
  default:
    return state;
  }
}
