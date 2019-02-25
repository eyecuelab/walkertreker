import constants from '../constants';
const { c, initialState: { steps } } = constants;

export default (state = steps, action) => {
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

    case c.STEPS_FAILED:
      return {
        ...state,
        isGettingSteps: false,
        error: action.error,
      }

    case c.IS_PEDOMETER_AVAILABLE:
      return {
        ...state,
        pedometerIsAvailable: action.pedometerIsAvailable,
      }

    default:
      return state;
    }
}
