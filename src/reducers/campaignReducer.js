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

  // this one might need to be refactored still; invited is now a thing on the server
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
  case c.PLAYER_JOINED_CAMPAIGN:
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
  default:
    return state;
  }
}
