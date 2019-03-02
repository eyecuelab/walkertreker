import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";
import { CLIENT_APP_KEY } from 'react-native-dotenv';

import constants from './constants';
const { c, storeData, retrieveData } = constants;

export const getSteps = state => state.steps;
export const getPlayer = state => state.player;
export const getCampaign = state => state.campaign;

// worker sagas ==============================

export function *fetchSteps() {

  const steps = yield select(getSteps);
  const dates = steps.campaignDateArray;
  const datesCopy = JSON.parse(JSON.stringify(dates));

  for (obj of datesCopy) {
    console.log('fetch steps loop, day ' + obj.day); // <= this is still here because it can be almost impossible to tell if this loop is working while debugging without it. it likes to stall on loop one every once and a while, so if you never see this console log hit two, it's time to restart both expo and the packager
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

  // original
  const url = 'https://walkertrekker.herokuapp.com/api/players';
  // const initObj = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "appkey": CLIENT_APP_KEY
  //   },
  //   body: JSON.stringify({displayName: action.name, phoneNumber: action.number})
  // };
  // ideally refactor to: yield call(() => {
  //   fetch(url, initObj)
  // })

  let localUri = action.avatar.uri
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formData = new FormData();
  const data = new FormData()
  data.append('displayName', action.name)
  data.append('phoneNumber', action.number)
  data.append('avatar', { uri: localUri, name: filename, type });
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
    // .then(response => response.text());
    // console.log('response', response);
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
  const lastState = yield select();
  console.log(JSON.stringify(lastState));
  yield storeData('lastState', JSON.stringify(lastState));
}

export function *checkBonusSteps(action) {
  const { steps, stepTargets } = action.player;
  // TODO: step targets lives in the player state slice once master is pulled again.  CHANGE IT SOON
  const { currentDay, inventory } = yield select(getCampaign);
  const { campaignDateArray } = yield select(getSteps);

  // console.log('bonus - steps: ', steps);
  // console.log('bonus - stepTargets: ', stepTargets);
  // console.log('bonus - currentDay: ', currentDay);
  // console.log('bonus - inventory: ', inventory);
  // console.log('bonus - campaignDateArray: ', campaignDateArray);

  if (steps[currentDay - 1] === 0 || campaignDateArray === null || stepTargets.length === 0 || currentDay === 0) {
    return;
  }

  const stepGoalToday = stepTargets[currentDay - 1];
  const stepsToday = steps[currentDay - 1];
  const newBonus = stepsToday - stepGoalToday;
  const timesScavengedToday = campaignDateArray[currentDay - 1].timesScavenged;
  const bonusStepsToday = campaignDateArray[currentDay - 1].bonus;

  console.log('stepGoalToday: ', stepGoalToday);
  console.log('stepsToday: ', stepsToday);
  console.log('timesScavengedToday: ', timesScavengedToday);
  console.log('bonusStepsToday: ', bonusStepsToday);
  console.log('newBonus: ', newBonus);
  if (
    stepsToday >= stepGoalToday &&
    bonusStepsToday === null
  ) {
    console.log('congrats! you made it to the safehouse!');
    yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});
    console.log('you have' + newBonus + ' of the 500 steps you need to scavenge.');
    // ABOVE IS THE FIRST PART

  } else if (
    stepsToday >= stepGoalToday &&
    bonusStepsToday !== null &&
    newBonus - (timesScavengedToday * 500) < 500 &&
    newBonus > bonusStepsToday
  ) {
    console.log('you took some more bonus steps!');
    yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});

  } else if (
    stepsToday >= stepGoalToday &&
    bonusStepsToday !== null &&
    newBonus - (timesScavengedToday * 500) < 500 &&
    newBonus <= bonusStepsToday
  ) {
    console.log('nothing has changed!');
    // yield put({type: c.ADD_BONUS_STEPS, currentDay: currentDay, bonus: newBonus});

  // TODO: split this function into multiple functions that can be called independently of each other. above will flip a madeToSafeHouse boolean and add bonus steps.  below will actually do the scavenging by assigning a scavenge type based on user input

  // TODO: split this function into multiple functions that can be called independently of each other. above will flip a madeToSafeHouse boolean and add bonus steps.  below will actually do the scavenging by assigning a scavenge type based on user input

  } else if (
    // BELOW IS THE SECOND PART
    stepsToday >= stepGoalToday &&
    bonusStepsToday !== null &&
    newBonus - (timesScavengedToday * 500) >= 500
    // ^ condition: there are 500 or more unused bonus steps
  ) {
    const newTimesScavenged = Math.floor(newBonus / 500);
    const scavengeDifference = newTimesScavenged - timesScavengedToday;
    const itemsScavenged = Object.assign({}, inventory);
    const thingScavenged = () => {
      const rando = Math.floor(Math.random() * 3);
      if (rando === 0) {
        return 'food';
      } else if (rando === 1) {
        return 'medicine';
      } else if (rando === 2) {
        return 'weapon';
      } else {
        console.warn('something is wrong with the scavenge randomizer');
      }
    };

    // TODO: remove these for prod
    console.log('way to go! you scavenged something!');
    // console.log('timesScavengedToday: ', timesScavengedToday);
    // console.log('newTimesScavenged: ', newTimesScavenged);
    // console.log('scavengeDifference: ', scavengeDifference);
    // console.log('pre-scavenge inventory: ', itemsScavenged);

    // TODO: rethink the for loop below so that it won't fuck up the campaign if two players scavenge at once.  as it is, each request could rewrite the others if multiples come through at once.  there is less than a 300ms interval (biggest one i've seen was 206ms) where this could happen
    let thing;
    for (let i = 0; i < scavengeDifference; i++) {
      thing = thingScavenged();
      // the console log below never hits
      console.log('loop ' + i + ': you scavenged a ' + thing + '!');
      if (thing === 'food') {
        itemsScavenged.foodItems++
        console.log('added a food: ', itemsScavenged);
      } else if (thing === 'medicine') {
        itemsScavenged.medicineItems++
        console.log('added a medicine: ', itemsScavenged);
      } else if (thing === 'weapon') {
        itemsScavenged.weaponItems++
        console.log('added a weapon: ', itemsScavenged);
      } else {
        console.warn('something is wrong with the scavenge randomizer');
        console.warn('thing is: ', thing);
      }
    }
    yield put({type: c.ADD_SCAVENGED_ITEMS, currentDay: currentDay, bonus: newBonus, timesScavenged: newTimesScavenged, inventory: itemsScavenged})
  }
}

export function *getLastStepState() {
  // TODO: retrieveData 'lastState' as object
  const lastStateString = yield retrieveData('lastState');
  let lastState;
  if (lastStateString != undefined) {
    lastState = JSON.parse(lastStateString)
    const lastStepState = lastState.steps;
    console.log('lastStepState: ', lastStepState);
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

export function *watchInitialCampaignDetails() {
  yield takeEvery(c.SET_INITIAL_CAMPAIGN_DETAILS, setInitialCampaignDetails);
}

export function *watchInvites() {
  yield takeEvery(c.SEND_INVITES, sendInvites);
}

export function *watchCampaignGetting() {
  yield takeEvery(c.FETCH_CAMPAIGN_INFO, fetchCampaignInfo);
}

export function *watchJoinCampaign() {
  yield takeEvery(c.SEND_JOIN_CAMPAIGN_REQUEST, joinCampaignRequest);
}

export function *watchCreatePlayer() {
  yield takeEvery(c.CREATE_PLAYER, createPlayer);
}

export function *watchUpdateCampaign() {
  yield takeEvery(c.UPDATE_CAMPAIGN, updateCampaign);
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
    yield take([c.PLAYER_CREATED, c.PLAYER_FETCHED, c.PLAYER_UPDATED]);
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

export function *watchGetLastStepState() {
  yield takeLatest(c.GET_LAST_STEP_STATE, getLastStepState);
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
    watchPlayerActions(),
    watchPlayerUpdated(),
    watchScavengedItems(),
    watchGetLastStepState(),
  ])
}
