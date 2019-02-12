  export default {
  campaignId: null, // populated by CreateCampaign
  campaignLength: '15', // populated by CreateCampaign
  difficultyLevel: 'easy', // populated by CreateCampaign
  randomEvents: 'low', // populated by CreateCampaign
  players: null, // populated by each player inidividually through JoinCampaign
  startDate: null, // populated by CampaignStaging
  numPlayers: 2, // derived in CampaignStaging once the host starts campaign
}
