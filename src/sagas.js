import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

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
    // console.log('fetch steps loop, day ', obj.start); // <= this is still here because it can be almost impossible to tell if this loop is working while debugging without it. it likes to stall on loop one every once and a while, so if you never see this console log hit two, it's time to restart both expo and the packager
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
  const url = `${endpoint}/api/campaigns`;
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
    yield put({type: c.HAVE_CAMPAIGNID, gotCampaignId: true});
  } catch (error) {
    yield put({type: c.GETTING_CAMPAIGNID, gettingCampaignId: false});
    console.warn('error setting campaign details: ', error);
  }
}

export function *sendInvites(action) {
  const url = `${endpoint}/api/campaigns/invite/` + action.campId;
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
  const url = `${endpoint}/api/campaigns/` + id;
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
    yield put({type: c.HAVE_CAMPAIGNID, gotCampaignId: true});
  } catch (error) {
    yield put({type: c.GETTING_CAMPAIGNID, gettingCampaignId: false});
    console.warn('error fetching campaign: ', error);
  }
}

export function *joinCampaignRequest(action) {

  const url = `${endpoint}/api/campaigns/join/` + action.campId;
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
    yield put({type: c.HAVE_CAMPAIGNID, gotCampaignId: true});
  } catch (error) {
    yield put({type: c.GETTING_CAMPAIGNID, gettingCampaignId: false});
    console.warn('error joining campaign: ', error);
  }
}

export function *createPlayer(action) {

  const url = `${endpoint}/api/players`;

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
    if (response.error) {
      console.log('player with that number already exists')
      yield put({type: c.GETTING_PLAYERID, gettingPlayerId: false});
    } else {
      yield put({type: c.PLAYER_CREATED, player: response})
      yield put({type: c.HAVE_PLAYERID, gotPlayerId: true});
    }
  } catch (error) {
    yield put({type: c.GETTING_PLAYERID, gettingPlayerId: false});
    console.warn('error creating player: ', error);
  }
}

export function *updateCampaign(action) {
  const url = `${endpoint}/api/campaigns/` + action.campId;
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

  const url = `${endpoint}/api/campaigns/leave/` + action.campId;

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
  const url = `${endpoint}/api/players/` + action.playId;
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
    yield put({type: c.HAVE_PLAYERID, gotPlayerId: true});
  } catch (error) {
    yield put({type: c.GETTING_PLAYERID, gettingPlayerId: false});
    console.warn('error fetching players: ', error);
  }
}

export function *updatePlayer(action) {
  const url = `${endpoint}/api/players`;
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
  const url = `${endpoint}/api/players/recover/` + action.phoneNumber
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
  const url = `${endpoint}/api/campaigns/start/` + action.campId;
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
  const url = `${endpoint}/api/campaigns/` + action.campId;
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
  const url = `${endpoint}/api/votes/` + action.eventId;
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
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json());
    // yield put({type: c.PLAYER_VOTE_CAST, vote: response});
  } catch (error) {
    console.warn('error casting player vote details: ', error);
  }
}

export function *updateJournal(action) {
  const url = `${endpoint}/api/journals/` + action.journalId;
  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      journalUpdate: {
        entry: action.entry,
        votingList: action.votingList,
      }
    })
  }
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json())
  } catch (err) {
    console.warn('error updating journal entry: ', err);
  }
}

export function *useInventory(action) {
  const url = `${endpoint}/api/inventories/` + action.inventoryId;
  const initObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      inventoryUpdate: {
        used: true,
        usedBy: action.usedBy,
        usedById: action.usedById,
      }
    })
  }
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json())
    console.log("response of update inventory", response)
  } catch (err) {
    console.warn('error updating inventory entry: ', err);
  }
}

export function *receiveInventory(action) {
  const url = `${endpoint}/api/inventories/` + action.campaignId;
  const initObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    },
    body: JSON.stringify({
      used: false,
      addedBy: action.addedBy,
      addedById: action.addedById,
      itemType: action.itemType,
      itemNumber: action.itemNumber
    })
  }
  try {
    const response = yield fetch(url, initObj)
    .then(response => response.json())
    console.log("response of adding inventory", response)
  } catch (err) {
    console.warn('error updating inventory entry: ', err);
  }
}

export function *saveState() {
  const lastState = yield select();
  yield storeData('lastState', JSON.stringify(lastState));
}

export function *checkBonusSteps(action) {
  const { steps, stepTargets } = action.player;
  const { currentDay, startDate, id } = yield select(getCampaign);
  const { campaignDateArray, scavengingFor } = yield select(getSteps);

  if (steps[currentDay] === 0 || campaignDateArray === null || stepTargets === null || startDate === null) {
    console.log("nothing to update in check steps")
    return; // there is no player or game or steps or step targets, so bye
  }
  const stepGoalToday = stepTargets[currentDay];
  const stepsToday = steps[currentDay];
  const newBonus = stepsToday - stepGoalToday;
  const timesScavengedToday = campaignDateArray[currentDay].timesScavenged;
  const bonusStepsToday = campaignDateArray[currentDay].bonus;

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
    yield put({type: c.START_SCAVENGE, currentDay: currentDay, bonus: newBonus, timesScavengedToday: timesScavengedToday });
    yield put({type: c.FETCH_CAMPAIGN_INFO, id: id });

  } else {
    return;
  }
}

export function *scavenge(action) {
  console.log('MADE IT TO SCAVENGE');
  const newTimesScavenged = action.timesScavengedToday + 1;
  const player = yield select(getPlayer);
  const campaign = yield select(getCampaign);
  
  const { scavengingFor, itemScavenged } = yield select(getSteps);

  const rando = (x) => Math.floor(Math.random() * x);
  let newItem;
  let itemType;

  if (scavengingFor === null || itemScavenged) {
    return;
  }

  console.log('newTimesScavenged', newTimesScavenged);
  console.log('scavengingFor', scavengingFor);

  if (scavengingFor === 'food') {
    newItem = rando(9);
    itemType = 'food'
  } else if (scavengingFor === 'medicine') {
    newItem = rando(6);
    itemType = 'med'
  } else if (scavengingFor === 'weapons') {
    newItem = rando(9);
    itemType = 'weapon'
  } else {
    console.warn('the scavenge function can\'t tell what to scavenge');
  } 

  console.log('made it through the scavenge branching, NEW ITEM: ', newItem);

  yield put({ type: c.RECEIVE_INVENTORY, 
    addedBy: 'player', 
    addedById: player.id, 
    campaignId: campaign.id,
    itemType: itemType,
    itemNumber: newItem
  })
  yield put({type: c.UPDATE_CAMPAIGN_WITH_SCAVENGE, currentDay: action.currentDay, bonus: action.bonus, timesScavenged: newTimesScavenged });
  yield put({type: c.DONE_SCAVENGING, itemScavenged: newItem });

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



// watcher sagas ==============================

export function *watchSetDates() {
  while (true) {
    yield take(c.SET_CAMPAIGN_DATES);
    yield put({type: c.GET_STEPS});
  }
}

/////////////
//Step Saga's
/////////////
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

////////////////////////////
//Event Sagas//////////////
//////////////////////////

export function *fetchEventInfo(action) {
  const url = `${endpoint}/api/events/campaign/${action.campaignId}`;
  const initObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "appkey": CLIENT_APP_KEY
    }
  };
  console.log("attempting to fetch event info with URL: ", url, " and initObj: ", initObj)
  try {
    console.log("attempting to fetch event info with URL: ", url, " and initObj: ", initObj)
    const response = yield fetch(url, initObj).then(response => response.json());
    console.log("event info in saga(line 611) : ", response)
    yield put({ type: c.EVENT_INFO_FETCHED, events: response })
  } catch ( error ) {
    console.warn('error fetching event info:', error);
  }
}

export function *watchFetchEventInfo() {
  console.log("reaching watcher saga with fetch_EVENT_INFO");
  yield takeLatest(c.FETCH_EVENT_INFO, fetchEventInfo);
}


////////////////////////////
//Campaign Watcher Sagas///
//////////////////////////
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
    yield take([c.PLAYER_CREATED, c.PLAYER_FETCHED]);
    const player = yield select(getPlayer);
    yield put({type: c.FETCH_CAMPAIGN_INFO, id: player.campaignId})
  }
}

export function *watchPlayerUpdated() {
  yield takeLatest(c.PLAYER_UPDATED, checkBonusSteps);
}

export function *watchCheckBonusSteps() {
  yield takeLatest(c.CHECK_BONUS_STEPS, checkBonusSteps)
}

export function *watchGetLastStepState() {
  yield takeLatest(c.GET_LAST_STEP_STATE, getLastStepState);
}

export function *watchStartScavenge() {
  yield takeEvery(c.START_SCAVENGE, scavenge);
}

export function *watchHungerAndHealth() {
  yield takeEvery(c.UPDATE_HUNGER_HEALTH, updateHungerAndHealth)
}

// event sagas
export function *watchCastVote() {
  yield takeLatest(c.CAST_VOTE, castPlayerVote)
}

export function *watchUpdateJournal() {
  yield takeLatest(c.UPDATE_JOURNAL, updateJournal)
}

// inventory sagas 
export function *watchReceiveInventory() {
  yield takeEvery(c.RECEIVE_INVENTORY, receiveInventory)
}

export function *watchUseInventory() {
  yield takeEvery(c.USE_INVENTORY, useInventory)
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
    watchFetchCampaign(),
    watchInvites(),
    watchInitialCampaignDetails(),
    watchSetDates(),
    watchStepUpdates(),
    watchCheckBonusSteps(),
    watchPlayerStepsUpdated(),
    watchSteps(),
    watchPlayerActions(),
    watchPlayerUpdated(),
    watchRecoverAccount(),
    watchGetLastStepState(),
    watchStartScavenge(),
    watchHungerAndHealth(),
    watchUseInventory(),
    watchReceiveInventory(),
    watchCastVote(),
    watchUpdateJournal(),
    watchFetchEventInfo(),
  ])
}


// LOCAL Kim home endpoint
// const endpoint = `http://192.168.1.5:5000`

//LOCAL Ward home endpoint
const endpoint = 'http://10.0.0.5:5000'

// LOCAL eyecue endpoint
// const endpoint = 'http://10.1.10.51:5000'

// LOCAL eyecue endpoint WARD
// const endpoint = 'http://10.1.10.108:5000'


// REMOTE
// const endpoint = 'https://walkertrekker.herokuapp.com'