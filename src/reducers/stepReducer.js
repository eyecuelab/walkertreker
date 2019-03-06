import constants from '../constants';
const { c, initialState: { steps } } = constants;

export default (state = steps, action) => {
  let newState;
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

    case c.ADD_BONUS_STEPS:
      newState = Object.assign({}, state);
      newState.campaignDateArray[action.currentDay].bonus = action.bonus;
      return newState;

    case c.SELECT_SCAVENGE:
      return {
        ...state,
        scavengingFor: action.scavengingFor,
      }

    case c.ADD_SCAVENGED_ITEMS:
      newState = Object.assign({}, state);
      newState.campaignDateArray[action.currentDay].timesScavenged = action.timesScavenged;
      newState.campaignDateArray[action.currentDay].bonus = action.bonus;
      return newState;

    case c.SET_STEP_STATE:
      newState = action.lastState;
      return newState;

    case c.GO_TO_SAFEHOUSE:
      newState = Object.assign({}, state);
      newState.campaignDateArray[action.currentDay].goalMet = true;
      return newState;

    default:
      return state;
    }
}
