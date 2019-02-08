import constants from '../constants';
const { c } = constants;

export default (state = {campaignDateArray: null, isGettingSteps: false}, action) => {
  switch (action.type) {
    case c.SET_CAMPAIGN_DATES:
      return {
        ...state,
        campaignDateArray: action.campaignDateArray,
      }

    case c.GET_STEPS:
      return {
        ...state,
        isGettingSteps: true,
      }

    case c.STEPS_RECEIVED:
      return {
        ...state,
        campaignDateArray: action.campaignDateArray,
        isGettingSteps: false,
      }

    default:
      return state;
    }
}
