import constants from '../constants';
const { c } = constants;
const initialStateCampaignDetailReducer = {
campaignId: null, // populated by CreateCampaign
campaignLength: null, // populated by CreateCampaign
difficultyLevel: null, // populated by CreateCampaign
randomEvents: null, // populated by CreateCampaign
players: null, // populated by each player inidividually through JoinCampaign
startDate: null, // populated by CampaignStaging
numPlayers: null, // derived in CampaignStaging once the host starts campaign
}

export default (state = initialStateCampaignDetailReducer, action) => {
  return state;
}
