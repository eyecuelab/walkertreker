import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

import constants from './constants';
const { c, storeData, retrieveData } = constants;

export const getSteps = state => state.steps;
export const getPlayer = state => state.player;

// worker sagas ==============================

export function *fetchSteps() {

  const steps = yield select(getSteps);
  const dates = steps.campaignDateArray;
  const datesCopy = JSON.parse(JSON.stringify(dates));

  for (obj of datesCopy) {
    console.log('fetch steps loop, day ' + obj.day); // <= this is still here because it can be almost impossible to tell if this loop is working while debugging without it
    try {
      const start = new Date(Date.parse(obj.start))
      const end = new Date(Date.parse(obj.end))
      const response = yield Pedometer.getStepCountAsync(start, end);
      const stepsToAdd = response.steps;

      const dateWithSteps = Object.assign({}, datesCopy[obj.day - 1], {steps: stepsToAdd});
      datesCopy.splice(obj.day - 1, 1, dateWithSteps);
    } catch (error) {
      yield put({type: c.STEPS_FAILED, error})
    }
  }
  yield storeData('stepInfo', JSON.stringify(steps))

  yield put({type: c.STEPS_RECEIVED, campaignDateArray: datesCopy});
}

export function *updatePlayerSteps(action) {

  const simpleArray = [];
  for (obj of action.campaignDateArray) {
    simpleArray.push(obj.steps);
  }
  yield put({type: c.UPDATE_PLAYER_STEPS, steps: simpleArray})
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
  // yield storeData('stepGoalDayOne', JSON.stringify(response.stepTargets[0]))

  // yield put({type: c.INITIAL_CAMPAIGN_DATA_RECEIVED, id: response.id, stepGoalDayOne: response.stepTargets[0]});
  yield put({type: c.INITIAL_CAMPAIGN_DATA_RECEIVED, campaign: response});
}

export function *sendInvites(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/invite/' + action.campId;
  const theBody = {};
  const phoneNums = Object.keys(action.invites);
  for (pNumber of phoneNums) {
    const aBody =
      {
        "playerId": action.playId,
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
    .then(response => response.json())
    // .then(response => response.text())
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
  yield put({type: c.CAMPAIGN_INFO_RECEIVED, campaign: response})

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

  yield put({type: c.PLAYER_JOINED_CAMPAIGN, campaign: response})
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

  yield put({type: c.PLAYER_CREATED, player: response})
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

  yield put({type: c.CAMPAIGN_UPDATED, campaign: response})
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

  yield put({type: c.CAMPAIGN_LEFT})
}

export function *fetchPlayer(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/players/' + action.playId;
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

  yield put({type: c.PLAYER_FETCHED, player: response})
}

export function *updatePlayer(action) {
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

  try {
    const response = yield fetch(url, initObj);
    .then(response => response.json());
    console.log('response: ', response);
    yield put({type: c.PLAYER_UPDATED, player: response});
  } catch (error) {
    console.log('error updating player: ', error)
  }
}

export function *startCampaign(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/start/' + action.campId;
  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      "startNow": action.startNow,
    })
  };
  console.log(url, initObj);

  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error starting campaign: ', error));
  console.log('response is: ', response);

  yield put({type: c.CAMPAIGN_STARTED, campaign: response})
}

export function *destroyCampaign(action) {
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/' + action.campId;
  const initObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
  };

  const response = yield fetch(url, initObj)
  .then(response => response.json())
  .catch(error => console.warn('error starting campaign: ', error));
  console.log('response is: ', response);

  yield put({type: c.CAMPAIGN_DESTROYED});
}

export function *saveState() {
  const allTheState = yield select();
  yield storeData('lastState', JSON.stringify(allTheState));
}

// watcher sagas ==============================

export function *watchSetDates() {
  yield take(c.SET_CAMPAIGN_DATES);
  yield put({type: c.GET_STEPS});
}
export function *watchSteps() {
  yield takeEvery(c.GET_STEPS, fetchSteps);
}

export function *watchStepUpdates() {
  yield takeEvery(c.STEPS_RECEIVED, updatePlayerSteps)
}

export function *watchPlayerStepsUpdated() {
  yield take(c.UPDATE_PLAYER_STEPS);
  const player = yield select(getPlayer);
  yield put({type: c.UPDATE_PLAYER, playId: player.id, steps: player.steps})
}

export function *watchInitialCampaignDetails() {
  yield takeEvery(c.SET_INITIAL_CAMPAIGN_DETAILS, setInitialCampaignDetails)
}

export function *watchInvites() {
  yield takeEvery(c.SEND_INVITES, sendInvites);
}

export function *watchCampaignGetting() {
  yield takeEvery(c.FETCH_CAMPAIGN_INFO, fetchCampaignInfo)
}

export function *watchJoinCampaign() {
  yield takeEvery(c.SEND_JOIN_CAMPAIGN_REQUEST, joinCampaignRequest)
}

export function *watchCreatePlayer() {
  yield takeEvery(c.CREATE_PLAYER, createPlayer)
}

export function *watchUpdateCampaign() {
  yield takeEvery(c.UPDATE_CAMPAIGN, updateCampaign)
}

export function *watchLeaveCampaign() {
  yield takeEvery(c.LEAVE_CAMPAIGN, leaveCampaign)
}

export function *watchFetchPlayer() {
  yield takeEvery(c.FETCH_PLAYER, fetchPlayer)
}

export function *watchUpdatePlayer() {
  yield takeEvery(c.UPDATE_PLAYER, updatePlayer)
}

export function *watchStartCampaign() {
  yield takeEvery(c.START_CAMPAIGN, startCampaign)
}

export function *watchDestroyCampaign() {
  yield takeEvery(c.DESTROY_CAMPAIGN, destroyCampaign)
}

export function *watchAppStateChange() {
  yield takeEvery(c.NEW_APP_STATE, saveState)
}

// root saga ==============================

export default function *rootSaga() {
  yield all([
    // watcher sagas go here
    watchDestroyCampaign(),
    watchStartCampaign(),
    watchAppStateChange(),
    watchUpdatePlayer(),
    watchFetchPlayer(),
    watchLeaveCampaign(),
    watchUpdateCampaign(),
    watchCreatePlayer(),
    watchJoinCampaign(),
    watchCampaignGetting(),
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSetDates(),
    watchStepUpdates(),
    watchPlayerStepsUpdated(),
    watchSteps(),
  ])
}
