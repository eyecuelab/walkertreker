import constants from "../../constants";

const {
  c,
  initialState: { auth }
} = constants;

export default (state = auth, action) => {
  switch (action.type) {
    case c.GETTING_PLAYERID: {
      const newState = { ...state, gettingPlayerId: action.gettingPlayerId };
      return newState;
    }
    case c.HAVE_PLAYERID: {
      const newState = {
        ...state,
        gotPlayerId: action.gotPlayerId,
        gettingPlayerId: false
      };
      return newState;
    }
    case c.GETTING_CAMPAIGNID: {
      const newState = {
        ...state,
        gettingCampaignId: action.gettingCampaignId
      };
      return newState;
    }
    case c.HAVE_CAMPAIGNID: {
      const newState = {
        ...state,
        gotCampaignId: action.gotCampaignId,
        gettingCampaignId: false
      };
      return newState;
    }
    default:
      return state;
  }
};
