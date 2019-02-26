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

  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield storeData('campaignId', JSON.stringify(response.id));
    yield put({type: c.INITIAL_CAMPAIGN_DATA_RECEIVED, campaign: response});
  } catch (error) {
    console.warn('error setting campaign details: ', error);
  }
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

    try {
      const response = yield fetch(url, initObj)
      .then(response => response.json());
      yield put({type: c.INVITES_SENT, invites: action.invites });
    } catch (error) {
      console.warn('error sending invites: ', error);
    }
  };
}

export function *fetchCampaignInfo(action) {

  const id = action.id;
  const url = 'https://walkertrekker.herokuapp.com/api/campaigns/' + id;
  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  };
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.CAMPAIGN_INFO_RECEIVED, campaign: response});
  } catch (error) {
    console.warn('error fetching campaign: ', error);
  }
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
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.PLAYER_JOINED_CAMPAIGN, campaign: response});
  } catch (error) {
    console.warn('error joining campaign: ', error);
  }
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
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.PLAYER_CREATED, player: response});
  } catch (error) {
    console.warn('error creating player: ', error);
  }
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

  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.CAMPAIGN_UPDATED, campaign: response});
  } catch (error) {
    console.warn('error updating campaign: ', error);
  }
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

  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.CAMPAIGN_LEFT});
  } catch (error) {
    console.warn('error leaving campaign: ', error);
  }
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

  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.PLAYER_FETCHED, player: response});
  } catch (error) {
    console.warn('error fetching players: ', error);
  }
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
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.PLAYER_UPDATED, player: response});
  } catch (error) {
    console.warn('error updating player: ', error)
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
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.CAMPAIGN_STARTED, campaign: response})
  } catch (error) {
    console.warn('error starting campaign: ', error)
  }
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

  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.CAMPAIGN_DESTROYED});
  } catch (error) {
    console.warn('error starting campaign: ', error)
  }
}

export function *saveState() {
  const allTheState = yield select();
  yield storeData('lastState', JSON.stringify(allTheState));
}

// watcher sagas ==============================

export function *watchSetDates() {
  while (true) {
    yield take(c.SET_CAMPAIGN_DATES);
    yield put({type: c.GET_STEPS});
  }
}
export function *watchSteps() {
  yield takeLatest(c.GET_STEPS, fetchSteps);
}

export function *watchStepUpdates() {
  yield takeEvery(c.STEPS_RECEIVED, updatePlayerSteps)
}

export function *watchPlayerStepsUpdated() {
  while (true) {
    yield take(c.UPDATE_PLAYER_STEPS);
    const player = yield select(getPlayer);
    yield put({type: c.UPDATE_PLAYER, playId: player.id, steps: player.steps})
  }
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
