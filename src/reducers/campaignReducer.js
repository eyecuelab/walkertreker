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
      campaignId: action.id,
      stepTargets: action.steps,
      //this needs to change ^ it needs to return an array of step goals to state
    }
  case c.INVITES_SENT:
    return {
      ...state,
      invited: action.invites,
    }
  case c.CAMPAIGN_INFO_RECEIVED:
    // this is only temporary. once we have more built, we'll have this put into state in a more useful way.  this is just a proof of concept right now.  the following console log is to remind us of that fact
    console.log('this action type currently just puts the whole response into state.campaign.fromTheServer.  this is not the desired effect for production; it is just a placeholder.');
    return {
      ...state,
      fromTheServer: action.info,
    }
  case c.PLAYER_JOINED_CAMPAIGN:
    return {
      ...state,
      players: action.players
    }
  case c.CAMPAIGN_UPDATED:
    // this is only temporary. once we have more built, we'll have this put into state in a more useful way.  this is just a proof of concept right now.  the following console log is to remind us of that fact
    console.log('this action type currently just puts the whole response into state.campaign.fromTheServer.  this is not the desired effect for production; it is just a placeholder.');
    return {
      ...state,
      fromTheServer: action.info,
    }
  case c.CAMPAIGN_LEFT:
    return {
      ...state,
      players: action.players
    }
  case c.PLAYER_FETCHED:
    newState = Object.assign({}, state);
    newState.players.push(action.player);
    return newState;
  case c.PLAYER_UPDATED:
    newState = Object.assign({}, state);
    const indexToUpdate = newState.players.findIndex(player => player.id === action.player.id);
    newState.players.splice(indexToUpdate, 1, action.player);
    return newState;
  default:
    return state;
  }
}
