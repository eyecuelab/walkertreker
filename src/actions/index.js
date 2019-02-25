import constants from '../constants';
const { c } = constants;

// this one might be ok, but it might need to be refactored for saga
export const setAppState = (appState) => ({
  type: c.NEW_APP_STATE,
  appState: appState,
});

export const setCampaignDates = (firstDayStart, firstDayEnd, length, difficultyLevel, stepGoalDayOne) => {
  let dateArray = [];
  let start;
  let end;

  console.log('firstDayStart: ', firstDayStart);
  console.log('firstDayEnd: ', firstDayEnd);
  console.log('length: ', length);
  console.log('difficultyLevel: ', difficultyLevel);
  console.log('stepGoalDayOne: ', stepGoalDayOne);
  console.log('last dateArray pre-loop: ', dateArray);

// TODO: this for loop breaks everything and runs forever.  FIX IT

  for (let i = 0; i < length; i++) {
    console.log(dateArray);
    let aGoal;
    start = new Date(firstDayStart);
    end = new Date(firstDayEnd);
    if (i === 0) {
      aGoal = stepGoalDayOne;
    } else {
      aGoal = null;
    }
    let newDateObj = {
      day: i + 1,
      start: new Date(start.setDate(start.getDate() + i)),
      end: new Date(end.setDate(end.getDate() + i)),
      steps: null,
      goal: aGoal,
      bonus: null,
      timesScavenged: null,
      goalMet: false,
    }
    dateArray.push(newDateObj);
  }
  console.log(dateArray);
  return ({
    type: c.SET_CAMPAIGN_DATES,
    campaignDateArray: dateArray,
  });
}
