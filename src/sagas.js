import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

import constants from './constants';
const { c, storeData, retrieveData } = constants;

export const getDates = state => state.steps.campaignDateArray

// worker sagas ==============================

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

export function *createPlayer(action) {

  const url = 'https://walkertrekker.herokuapp.com/api/players';
  const initObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({displayName: action.name, phoneNumber: action.number})
  };
  // ideally refactor to: yield call(() => {
  //   fetch(url, initObj)
  // })
  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error creating player: ', error));
  console.log('response is: ', response);

  yield put({type: c.PLAYER_CREATED}) // this will carry a payload in the future, but for now it is blank
}

export function *updateCampaign(action) {

  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/' + action.campId;
  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      "campaignUpdate": {
        "currentDay": action.currentDay,
        "inventory": action.inventory,
      }
    })
  };

  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error updating campaign: ', error));
  console.log('response is: ', response);

  yield put({type: c.CAMPAIGN_UPDATED, info: response})
}

export function *leaveCampaign(action) {

  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/leave/' + action.campId;

  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({"playerId": action.playId})
  };

  const response = yield fetch(url, initObj)
    .then(response => response.json())
    .catch(error => console.warn('error leaving campaign: ', error));
    console.log('response is: ', response);

  yield put({type: c.CAMPAIGN_LEFT, players: response.players})
}

export function *fetchPlayers() {

  const url = 'https://walkertrekker.herokuapp.com/api/players';

  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  };

  const response = yield fetch(url, initObj)
    .then(response => response.json())
    .catch(error => console.log('error fetching players: ', error))
  console.log(response);

  yield put({type: c.PLAYERS_FETCHED})
}

export function *updatePlayer(action) {
  // PATCH
  // /api/players
  // curl -X PATCH -H "Content-type: application/json" -H "appkey: abc" -H -d '{ "playerId": "58568813-712d-451b-9125-4103c6f1d7e5", "playerUpdate": { "hunger" 88, "steps": [1698, 0, 0, 0, ...] } }' http://walkertrekker.herokuapp.com/api/players

  const url = 'https://walkertrekker.herokuapp.com/api/players';

  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      "playerId": action.playId,
      "playerUpdate": {
        "hunger": action.hunger,
        "health": action.health,
        "steps": action.steps
      }
    })
  };

  const response = yield fetch(url, initObj)
    .then(response => response.json())
    .catch(error => console.log('error updating player: ', error))
  console.log(response);

  yield put({type: c.PLAYER_UPDATED, player: response})
}

// watcher sagas ==============================

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

export function *watchCreatePlayer() {
  yield takeLatest(c.CREATE_PLAYER, createPlayer)
}

export function *watchUpdateCampaign() {
  yield takeLatest(c.UPDATE_CAMPAIGN, updateCampaign)
}

export function *watchLeaveCampaign() {
  yield takeLatest(c.LEAVE_CAMPAIGN, leaveCampaign)
}

export function *watchFetchPlayers() {
  yield takeLatest(c.FETCH_PLAYERS, fetchPlayers)
}

export function *watchUpdatePlayer() {
  yield takeLatest(c.UPDATE_PLAYER, updatePlayer)
}

// root saga ==============================

export default function *rootSaga() {
  yield all([
    // watcher sagas go here
    watchUpdatePlayer(),
    watchFetchPlayers(),
    watchLeaveCampaign(),
    watchUpdateCampaign(),
    watchCreatePlayer(),
    watchJoinCampaign(),
    watchCampaignGetting(),
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSteps(),
  ])
}
