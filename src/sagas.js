import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects';
import { Pedometer } from "expo";

import constants from './constants';
const { c } = constants;

export const getDates = state => state.steps.campaignDateArray

// export function *fetchSteps() {
//   const dates = yield select(getDates);
//   const datesCopy = JSON.parse(JSON.stringify(dates));
//   datesCopy.forEach((obj, index) => {
//     yield Pedometer.getStepCountAsync(new Date(Date.parse(obj.start)), new Date(Date.parse(obj.end)));
//     .then(
//       (response) => {
//         const stepsToAdd = response.steps;
//         const dateWithSteps = Object.assign({}, datesCopy[index], stepsToAdd);
//         datesCopy.splice(index, 1, dateWithSteps);
//       },
//       (error) => {
//         console.log('error retrieving pedometer data at campaign day ' + (index + 1) + ' in *fetchSteps');
//       }
//     );
//   });
//   yield put({type: c.STEPS_RECEIVED, campaignDateArray: datesCopy});
// }

export function *fetchSteps() {
  console.log('fetching steps!');
  const dates = yield select(getDates);
  const datesCopy = JSON.parse(JSON.stringify(dates));

  for (obj of datesCopy) {
    console.log('in the for loop!');
    yield Pedometer.getStepCountAsync(new Date(Date.parse(obj.start)), new Date(Date.parse(obj.end))).then(
      (response) => {
        console.log('got response!');
        const stepsToAdd = response.steps;
        const dateWithSteps = Object.assign({}, datesCopy[obj.day - 1], stepsToAdd);
        datesCopy.splice(obj.day - 1, 1, dateWithSteps);
      }
    )
    .catch(
      (error) => {
        console.log('error retrieving pedometer data at campaign day ' + (obj.day) + ' in *fetchSteps');
      }
    )
  }
  console.log('almost done!');
  yield put({type: c.STEPS_RECEIVED, campaignDateArray: datesCopy});
}

export function *watchSteps() {
  yield takeEvery(c.GET_STEPS, fetchSteps);
}

export default function* rootSaga() {
  yield all([
    //watcher sagas
    watchSteps(),
  ])
}
