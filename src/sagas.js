import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';
import  NavigationService  from './nav/NavigationService';

import constants from './constants';
const { c, storeData, retrieveData, item } = constants;

export const getSteps = state => state.steps;
export const getPlayer = state => state.player;
export const getCampaign = state => state.campaign;

// worker sagas ==============================

export function *fetchSteps() {

  const steps = yield select(getSteps);
  const dates = steps.campaignDateArray;
  const datesCopy = JSON.parse(JSON.stringify(dates));

  // Here we could only loop through the dates that are relevent (speed it up)
  // 
  for (obj of datesCopy) {
    console.log('fetch steps loop, day ' + obj.day); // <= this is still here because it can be almost impossible to tell if this loop is working while debugging without it. it likes to stall on loop one every once and a while, so if you never see this console log hit two, it's time to restart both expo and the packager
    try {
      const start = new Date(Date.parse(obj.start))
      const end = new Date(Date.parse(obj.end))
      const response = yield Pedometer.getStepCountAsync(start, end);
      const stepsToAdd = response.steps;
      const dateWithSteps = Object.assign({}, datesCopy[obj.day], {steps: stepsToAdd});
      datesCopy.splice(obj.day, 1, dateWithSteps);
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
  console.log("setting campaign")
  const url = 'http://10.1.10.51:5000/api/campaigns';
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
    console.log("storing", response)
    yield storeData('campaignId', JSON.stringify(response.id));
    yield put({type: c.INITIAL_CAMPAIGN_DATA_RECEIVED, campaign: response});
  } catch (error) {
    console.warn('error setting campaign details: ', error);
  }
}

export function *sendInvites(action) {
  const url = 'http://10.1.10.51:5000/api/campaigns/invite/' + action.campId;
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
  const url = 'http://10.1.10.51:5000/api/campaigns/' + id;
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

  const url = 'http://10.1.10.51:5000/api/campaigns/join/' + action.campId;
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

  const url = 'http://10.1.10.51:5000/api/players';

  const data = new FormData()

  data.append('displayName', action.name)
  data.append('phoneNumber', action.number)
  data.append('pushToken', action.pushToken)

  if (action.avatar.uri) {
    let localUri = action.avatar.uri
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    data.append('avatar', { uri: localUri, name: filename, type });
  }

  const initObj = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "appkey": CLIENT_APP_KEY
    },
    body: data
  };
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    response.error ? console.log('player with that number already exists') :
    yield put({type: c.PLAYER_CREATED, player: response});
  } catch (error) {
    console.warn('error creating player: ', error);
  }
}

export function *updateCampaign(action) {
  console.log("in update campaign saga")
  console.log("in update campaign saga", action.campId)
  const url = 'http://10.1.10.51:5000/api/campaigns/' + action.campId;
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
        "completedEvents": action.completedEvents,
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

  const url = 'http://10.1.10.51:5000/api/campaigns/leave/' + action.campId;

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
  const url = 'http://10.1.10.51:5000/api/players/' + action.playId;
  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  };

  try {
    console.log('playId in saga', action.playId)
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    yield put({type: c.PLAYER_FETCHED, player: response});
  } catch (error) {
    console.warn('error fetching players: ', error);
  }
}

export function *updatePlayer(action) {
  const url = 'http://10.1.10.51:5000/api/players';
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


export function *sendRecoverAccount(action) {
  const url = 'http://10.1.10.51:5000/api/players/recover/' + action.phoneNumber
  console.log(url)
  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  }
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    // yield put({type: c.ACCOUNT_RECOVERED, player: response});
  } catch (error) {
    console.warn('error recovering players: ', error);
  }
}


export function *startCampaign(action) {
  const url = 'http://10.1.10.51:5000/api/campaigns/start/' + action.campId;
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
  const url = 'http://10.1.10.51:5000/api/campaigns/' + action.campId;
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

export function *castPlayerVote(action) {
  console.log("player casting vote", action)
  const url = 'http://10.1.10.51:5000/api/votes/' + action.eventId;
  const initObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      playerId: action.playerId,
      vote: action.vote,
    })
  }
  console.log(initObj)
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    console.log("response of player cast vote", response)
    // yield put({type: c.PLAYER_VOTE_CAST, vote: response});
  } catch (error) {
    console.warn('error casting player vote details: ', error);
  }
}

export function *saveState() {
  const lastState = yield select();
  console.log(JSON.stringify(lastState));
  yield storeData('lastState', JSON.stringify(lastState));
}

export function *checkBonusSteps(action) {
  console.log("actionPAYLOAD!>!>!>!>!>!>!>!" + JSON.stringify(action.player));
  const { steps, stepTargets } = action.player;
  const { currentDay, inventory, startDate } = yield select(getCampaign);
  const { campaignDateArray, scavengingFor } = yield select(getSteps);

  if (steps[currentDay] === 0 || campaignDateArray === null || stepTargets === null || startDate === null) {
    return; // there is no player or game or steps or step targets, so bye
  }

  const stepGoalToday = stepTargets[currentDay];
  const stepsToday = steps[currentDay];
  const newBonus = stepsToday - stepGoalToday;
  const timesScavengedToday = campaignDateArray[currentDay].timesScavenged;
  const bonusStepsToday = campaignDateArray[currentDay].bonus;

  // if (
  //   // no additional bonus steps have been taken
  //   stepsToday >= stepGoalToday &&
  //   bonusStepsToday !== null &&
  //   newBonus - (timesScavengedToday * 500) < 500 &&
  //   newBonus <= bonusStepsToday
  // ) {
  //   return; // there is nothing to do
  //
  // } else
  if (
    // there are bonus steps for the first time today
    stepsToday >= stepGoalToday &&
    bonusStepsToday === null
  ) {
    yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});
    yield put({type: c.GO_TO_SAFEHOUSE, currentDay: currentDay});

  } else if (
    // there are new bonus steps but not enough to scavenge
    stepsToday >= stepGoalToday &&
    bonusStepsToday !== null &&
    newBonus - (timesScavengedToday * 500) < 500 &&
    newBonus > bonusStepsToday
  ) {
    yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});

  } else if (
    // there are 500 or more unused bonus steps to use for scavenging
    stepsToday >= stepGoalToday &&
    bonusStepsToday !== null &&
    newBonus - (timesScavengedToday * 500) >= 500 &&
    scavengingFor
  ) {
    yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});
    yield put({type: c.START_SCAVENGE, currentDay: currentDay, bonus: newBonus, timesScavengedToday: timesScavengedToday, inventory: inventory});
  } else {
    return;
  }
}

export function *scavenge(action) {
  console.log('MADE IT TO SCAVENGE');
  const newTimesScavenged = action.timesScavengedToday + 1;
  const itemsScavenged = Object.assign({}, action.inventory);
  const { scavengingFor, justScavenged } = yield select(getSteps);
  const rando = (x) => Math.floor(Math.random() * x);
  let newItem;

  if (scavengingFor === null || justScavenged) {
    return;
  }

  console.log('newTimesScavenged', newTimesScavenged);
  console.log('itemsScavenged', itemsScavenged);
  console.log('scavengingFor', scavengingFor);

  if (scavengingFor === 'food') {
    newItem = rando(9);
    itemsScavenged.foodItems.push(newItem);
    console.log('newItem', newItem);
  } else if (scavengingFor === 'medicine') {
    newItem = rando(6);
    itemsScavenged.medicineItems.push(newItem);
    console.log('newItem', newItem);
  } else if (scavengingFor === 'weapons') {
    newItem = rando(9);
    itemsScavenged.weaponItems.push(newItem);
    console.log('newItem', newItem);
  } else {
    console.warn('the scavenge function can\'t tell what to scavenge');
  }

  console.log('made it through the scavenge branching');

  yield put({type: c.ADD_SCAVENGED_ITEMS, currentDay: action.currentDay, bonus: action.bonus, timesScavenged: newTimesScavenged, inventory: itemsScavenged});
  yield put({type: c.DONE_SCAVENGING, justScavenged: newItem });
}

export function *updateHungerAndHealth(action) {
  yield put({type: c.UPDATE_HUNGER, hunger: action.hunger});
  yield put({type: c.UPDATE_HEALTH, health: action.health});
  const player = yield select(getPlayer);
  yield put({type: c.UPDATE_PLAYER, playId: player.id, hunger: player.hunger, health: player.health});
  // TODO: test this logic and see if it breaks anything
  const campaign = yield select(getCampaign);
  yield put({type: c.UPDATE_CAMPAIGN, campId: campaign.id, inventory: campaign.inventory});
};

export function *getLastStepState() {
  // TODO: retrieveData 'lastState' as object
  const lastStateString = yield retrieveData('lastState');
  let lastState;
  if (lastStateString != undefined) {
    lastState = JSON.parse(lastStateString)
    const lastStepState = lastState.steps;
    // console.log('lastStepState: ', lastStepState);
    yield put({type: c.SET_STEP_STATE, lastState: lastStepState})
  }
  if (
    yield select(getSteps).pedometerIsAvailable &&
    lastStepState.campaignDateArray !== null
  ) {
    yield put({type: c.GET_STEPS});
  }
}

export function *watchGetLastStepState() {
  yield takeLatest(c.GET_LAST_STEP_STATE, getLastStepState);
}

///////////////////
//REDIRECT SAGAS
///////////////////
export function *handleRedirectAction(action) {
  console.log("attempting to handleNavigationRedirect with path - in SAGA ", action.redirectAction 
  )
  yield NavigationService.navigate(action.redirectAction);
  
  yield put({type: c.CLEAR_REDIRECT_ACTION});
}

export function *watchHandleRedirectAction() {
  yield takeEvery(c.HANDLE_REDIRECT_ACTION, handleRedirectAction);
}



//////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////// watcher sagas /////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


export function *watchSetDates() {
  while (true) {
    yield take(c.SET_CAMPAIGN_DATES);
    yield put({type: c.GET_STEPS});
  }
}




//Step Saga's
export function *watchSteps() {
  yield takeLatest(c.GET_STEPS, fetchSteps);
}

export function *watchStepUpdates() {
  yield takeEvery(c.STEPS_RECEIVED, updatePlayerSteps);
}

export function *watchPlayerStepsUpdated() {
  while (true) {
    yield take(c.UPDATE_PLAYER_STEPS);
    const player = yield select(getPlayer);
    yield put({type: c.UPDATE_PLAYER, playId: player.id, steps: player.steps});
  }
}

///////////////////
//Campaign Sagas///
///////////////////
export function *watchInitialCampaignDetails() {
  yield takeEvery(c.SET_INITIAL_CAMPAIGN_DETAILS, setInitialCampaignDetails);
}

export function *watchInvites() {
  yield takeEvery(c.SEND_INVITES, sendInvites);
}

export function *watchFetchCampaign() {
  yield takeEvery(c.FETCH_CAMPAIGN_INFO, fetchCampaignInfo);
}

export function *watchJoinCampaign() {
  yield takeEvery(c.SEND_JOIN_CAMPAIGN_REQUEST, joinCampaignRequest);
}


//Player Sagas
export function *watchCreatePlayer() {
  yield takeEvery(c.CREATE_PLAYER, createPlayer);
}

export function *watchUpdateCampaign() {
  yield takeEvery([c.UPDATE_CAMPAIGN, c.RECEIVED_EVENT], updateCampaign);
}

export function *watchLeaveCampaign() {
  yield takeEvery(c.LEAVE_CAMPAIGN, leaveCampaign);
}

export function *watchFetchPlayer() {
  yield takeEvery(c.FETCH_PLAYER, fetchPlayer);
}

export function *watchUpdatePlayer() {
  yield takeEvery(c.UPDATE_PLAYER, updatePlayer);
}

export function *watchRecoverAccount() {
  yield takeEvery(c.RECOVER_ACCOUNT, sendRecoverAccount);
}

export function *watchStartCampaign() {
  yield takeEvery(c.START_CAMPAIGN, startCampaign);
}

export function *watchDestroyCampaign() {
  yield takeEvery(c.DESTROY_CAMPAIGN, destroyCampaign);
}

export function *watchAppStateChange() {
  yield takeEvery(c.NEW_APP_STATE, saveState);
}

export function *watchPlayerActions() {
  while (true) {
    yield take([c.PLAYER_CREATED, c.PLAYER_FETCHED /*, c.PLAYER_UPDATED*/]);
    const player = yield select(getPlayer);
    yield put({type: c.FETCH_CAMPAIGN_INFO, id: player.campaignId})
  }
}

export function *watchPlayerUpdated() {
  yield takeLatest(c.PLAYER_UPDATED, checkBonusSteps);
}

export function *watchScavengedItems() {
  const action = yield take(c.ADD_SCAVENGED_ITEMS);
  const campaign = yield select(getCampaign);
  yield put({type: c.UPDATE_CAMPAIGN, campId: campaign.id, inventory: action.inventory});
}



export function *watchStartScavenge() {
  yield takeEvery(c.START_SCAVENGE, scavenge);0
}

export function *watchHungerAndHealth() {
  yield takeEvery(c.UPDATE_HUNGER_HEALTH, updateHungerAndHealth)
}

<<<<<<< HEAD

=======
// event sagas
export function *watchCastVote() {
  yield takeLatest(c.CAST_VOTE, castPlayerVote)
}
>>>>>>> master

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
    watchFetchCampaign(),
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSetDates(),
    watchStepUpdates(),
    watchPlayerStepsUpdated(),
    watchSteps(),
    watchPlayerActions(),
    watchPlayerUpdated(),
    watchRecoverAccount(),
    watchScavengedItems(),
    watchGetLastStepState(),
    watchStartScavenge(),
    watchHungerAndHealth(),
<<<<<<< HEAD
    watchHandleRedirectAction(),
=======
    watchCastVote(),
>>>>>>> master
  ])
}
