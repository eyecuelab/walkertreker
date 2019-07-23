import constants from './../../constants';
const { c, storeData } = constants;


export default (state = {}, action) => {
  switch (action.type) {
  case c.NEW_EVENT:
    return action.event;
  case c.END_EVENT:
    return {};
  case c.EVENT_INFO_FETCHED:
    return { ...state, events: action.events }
  default:
    return state;
  }
}
