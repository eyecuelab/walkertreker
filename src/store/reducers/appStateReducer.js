import { select } from 'redux-saga/effects';

import constants from './../../constants';
const { c, storeData } = constants;


export default (state = 'active', action) => {
  switch (action.type) {
  case c.NEW_APP_STATE:
    return action.appState;
  default:
    return state;
  }
}
