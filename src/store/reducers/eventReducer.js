import { select } from 'redux-saga/effects';

import constants from './../../constants';
const { c, storeData } = constants;


export default (state = {}, action) => {
  switch (action.type) {
  case c.NEW_EVENT:
    return action.event;
  case c.END_EVENT:
    return {};
  default:
    return state;
  }
}
