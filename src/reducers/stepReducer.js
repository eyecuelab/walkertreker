import initialStateStepReducer from '../constants/initialStates/initialStateStepReducer';

export default (state = initialStateStepReducer, action) => {
  switch (action.type) {
  case 'SET_CAMPAIGN_DATES':
    const newState = {
      campaignDateArray: action.campaignDateArray,
    }
  default:
    return state;
  }
}
