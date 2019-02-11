import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";

import constants from './constants';
const { c } = constants;

export const getDates = state => state.steps.campaignDateArray

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

export function *watchSteps() {
  yield takeLatest(c.GET_STEPS, fetchSteps);
}

export default function* rootSaga() {
  yield all([
    // watcher sagas go here
    watchSteps(),
  ])
}
