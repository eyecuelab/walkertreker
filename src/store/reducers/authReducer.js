import constants from './../../constants';
const { c, initialState: { auth } } = constants;



export default (state = auth, action) => {
  switch (action.type) {
  case c.GETTING_PLAYERID:
      newState = {...state, gettingPlayerId: action.gettingPlayerId}
      return newState;
  case c.HAVE_PLAYERID:
    newState = {...state, gotPlayerId: action.gotPlayerId, gettingPlayerId: false}
    return newState;
  case c.GETTING_CAMPAIGNID:
      newState = {...state, gettingCampaignId: action.gettingCampaignId};
      return newState;
  case c.HAVE_CAMPAIGNID:
    newState = {...state, gotCampaignId: action.gotCampaignId, gettingCampaignId: false};
    return newState;
  default:
    return state;
  }
}
