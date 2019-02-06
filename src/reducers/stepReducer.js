import constants from '../constants';
const { c } = constants;

export default (state = null, action) => {
  switch (action.type) {
  case c.SET_CAMPAIGN_DATES:
    return action.campaignDateArray;

  case c.SET_STEPS:
    return action.campaignDateArray;

  default:
    return state;
  }
}
