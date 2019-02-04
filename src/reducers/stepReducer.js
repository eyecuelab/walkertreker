import constants from '../constants';
const { c, initialState } = constants;

export default (state = initialState.steps, action) => {
  switch (action.type) {
  case c.SET_CAMPAIGN_DATES:
    const newState = {
      campaignDateArray: action.campaignDateArray,
    }
  default:
    return state;
  }
}
