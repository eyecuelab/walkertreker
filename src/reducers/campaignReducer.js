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
  // this one might need to be refactored still; invited is now a thing on the server
  case c.INVITES_SENT:
    return {
      ...state,
      invited: action.invites,
    }
  case c.INITIAL_CAMPAIGN_DATA_RECEIVED:
    newState = Object.assign({}, state, action.campaign);
    return newState;
  case c.CAMPAIGN_INFO_RECEIVED:
    newState = Object.assign({}, state, action.campaign);
    return newState;
  case c.PLAYER_JOINED_CAMPAIGN:
    newState = Object.assign({}, state, action.campaign);
    return newState;
  case c.CAMPAIGN_UPDATED:
    newState = Object.assign({}, state, action.campaign);
    return newState;
  case c.CAMPAIGN_LEFT:
    newState = Object.assign({}, state, action.campaign);
    return newState;
  default:
    return state;
  }
}
