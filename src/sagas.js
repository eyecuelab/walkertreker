import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

import constants from './constants';
const { c, storeData, retrieveData } = constants;

export const getDates = state => state.steps.campaignDateArray

// ==============================

export function *fetchSteps() {

  console.log('fetching steps!');
  const dates = yield select(getDates);
  const datesCopy = JSON.parse(JSON.stringify(dates));

  for (obj of datesCopy) {
    try {
      const response = yield call(Pedometer.getStepCountAsync, new Date(Date.parse(obj.start)), new Date(Date.parse(obj.end)));

      // console.log('past the first yield');
      const stepsToAdd = response.steps;

      const dateWithSteps = Object.assign({}, datesCopy[obj.day - 1], {steps: stepsToAdd});

      datesCopy.splice(obj.day - 1, 1, dateWithSteps);
    } catch (error) {
      yield put({type: c.STEPS_FAILED, error})
    }
  }
  yield put({type: c.STEPS_RECEIVED, campaignDateArray: datesCopy});
}

export function *setInitialCampaignDetails(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns';
  const initObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify(action.payload)
  }

  const response = yield fetch(url, initObj)
    .then(response => response.json())
    .catch(error => console.log('error setting campaign details: ', error));

  console.log('response is: ');
  console.log(response);

  yield storeData('campaignId', JSON.stringify(response.id))
  yield storeData('stepGoalDayOne', JSON.stringify(response.stepTargets[0]))

  const campId = yield retrieveData('campaignId');
  const stepD1 = yield retrieveData('stepGoalDayOne');

  yield put({type: c.CAMPAIGN_DATA_RECEIVED, id: campId, stepGoalDayOne: stepD1});
}

// you are here
export function *sendInvites(action) {

  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/invite';
  const theBody = {};
  const phoneNums = Object.keys(action.invites);

  for (pNumber of phoneNums) {
  // phoneNums.forEach((pNumber) => {
    const aBody =
      {
        "campaignId": JSON.parse(action.campId),
        // in reality we'll use the commented-out playerId below; this is just for testing:
        "playerId": "7dd089c0-7f4b-4f39-a662-53554834a8f7",
        // "playerId": action.playId,
        "phoneNumber": pNumber,
      }
    // Object.assign(theBody, aBody);
    const initObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "appkey": CLIENT_APP_KEY
      },
      body: JSON.stringify(aBody)
    }
    console.log(initObj);

    const response = yield fetch(url, initObj)
    // .then(response => response.json())
    .then(response => response.text())
    .catch(error => console.warn('error sending invites: ', error));

    console.log('response is: ');
    console.log(response);
  };

  // yield put({type: c.INVITES_SENT, confirmations: response.msg, invites: action.invites })
}

//==============================

export function *watchSteps() {
  yield takeLatest(c.GET_STEPS, fetchSteps);
}

export function *watchInitialCampaignDetails() {
  yield takeLatest(c.SET_INITIAL_CAMPAIGN_DETAILS, setInitialCampaignDetails)
}

export function *watchInvites() {
  yield takeLatest(c.SEND_INVITES, sendInvites);
}

//==============================

export default function *rootSaga() {
  yield all([
    // watcher sagas go here
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSteps(),
  ])
}
