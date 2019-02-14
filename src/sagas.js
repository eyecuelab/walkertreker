import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

import constants from './constants';
const { c, storeData, retrieveData } = constants;

export const getDates = state => state.steps.campaignDateArray

// ==============================

export function *fetchSteps() {

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

  // const response = yield call(fetch, url, initObj)
  const response = yield fetch(url, initObj)
    .then(response => response.json())
    .catch(error => console.log('error setting campaign details: ', error));

  console.log('response is: ');
  console.log(response);

  yield storeData('campaignId', JSON.stringify(response.id))
  yield storeData('stepGoalDayOne', JSON.stringify(response.stepTargets[0]))

  const campId = yield retrieveData('campaignId');
  const stepD1 = yield retrieveData('stepGoalDayOne');

  yield put({type: c.INITIAL_CAMPAIGN_DATA_RECEIVED, id: campId, stepGoalDayOne: stepD1});
}

export function *sendInvites(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/invite/' + JSON.parse(action.campId);
  const theBody = {};
  const phoneNums = Object.keys(action.invites);
  for (pNumber of phoneNums) {
    const aBody =
      {
        // in reality we'll use the commented-out playerId below; this is just for testing:
        "playerId": "7dd089c0-7f4b-4f39-a662-53554834a8f7",
        // "playerId": action.playId,
        "phoneNumber": pNumber,
      }
    const initObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "appkey": CLIENT_APP_KEY
      },
      body: JSON.stringify(aBody)
    }
    console.log(initObj);
    // const response = yield call(fetch, url, initObj)
    const response = yield fetch(url, initObj)
    // .then(response => response.json())
    .then(response => response.text())
    .catch(error => console.warn('error sending invites: ', error));
    console.log('response is: ', response);
  };
  yield put({type: c.INVITES_SENT, invites: action.invites })
}

export function *fetchCampaignInfo(action) {

  const id = action.id;
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/' + id;
  console.log(url);
  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  };

  // const response = yield call(fetch, url, initObj) // for some reason this does not work...
  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error fetching campaign: ', error));
  console.log('response is: ', response);

  //here you are
  yield put({type: c.CAMPAIGN_INFO_RECEIVED, info: response})

}

export function *joinCampaignRequest(action) {
  // PATCH
  // /api/campaigns/join/:campaignId
  //curl -X GET -H "Content-type: application/json" -H "appkey: abc" -d '{ "playerId": "7dd089c0-7f4b-4f39-a662-53554834a8f7" }' https://walkertrekker.herokuapp.com/api/campaigns/join/58568813-712d-451b-9125-4103c6f1d7e5

  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/join/' + action.campId;
  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({playerId: action.playId})
  };

  // ideally refactor to: yield call(() => {
  //   fetch(url, initObj)
  // })
  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error joining campaign: ', error));
  console.log('response is: ', response);

  yield put({type: c.PLAYER_JOINED_CAMPAIGN, players: response.players})
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

export function *watchCampaignGetting() {
  yield takeLatest(c.FETCH_CAMPAIGN_INFO, fetchCampaignInfo)
}

export function *watchJoinCampaign() {
  yield takeLatest(c.SEND_JOIN_CAMPAIGN_REQUEST, joinCampaignRequest)
}

//==============================

export default function *rootSaga() {
  yield all([
    // watcher sagas go here
    watchJoinCampaign(),
    watchCampaignGetting(),
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSteps(),
  ])
}
