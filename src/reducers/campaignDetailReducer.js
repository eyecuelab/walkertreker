import constants from '../constants';
const { c } = constants;
const initialStateCampaignDetailReducer = {
campaignId: null, // populated by CreateCampaign
campaignLength: '15', // populated by CreateCampaign
difficultyLevel: 'easy', // populated by CreateCampaign
randomEvents: 'low', // populated by CreateCampaign
stepGoalDayOne: null, // populated by CreateCampaign
invited: null, //populated by InvitePlayers
players: null, // populated by each player inidividually through JoinCampaign
startDate: null, // populated by CampaignStaging
numPlayers: null, // derived in CampaignStaging once the host starts campaign
}

export default (state = initialStateCampaignDetailReducer, action) => {
  switch (action.type) {
  case c.SET_CAMPAIGN_LENGTH:
    return {
      ...state,
      campaignLength: action.campaignLength
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
      stepGoalDayOne: action.stepGoalDayOne,
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
  case c.PLAYERS_FETCHED:
    // we don't actually see any use case for this, but this action exists just in case
    return state;
  default:
    return state;
  }
}
