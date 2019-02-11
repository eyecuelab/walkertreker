import constants from '../constants';
const { c } = constants;
const initialStateCampaignDetailReducer = {
campaignId: null, // populated by CreateCampaign
campaignLength: '15', // populated by CreateCampaign
difficultyLevel: 'easy', // populated by CreateCampaign
randomEvents: 'low', // populated by CreateCampaign
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
  default:
    return state;
  }
}
