import constants from '../constants';
const { c } = constants;

// this one might be ok, but it might need to be refactored for saga
export const setAppState = (appState) => ({
  type: c.NEW_APP_STATE,
  appState: appState,
});

// this will almost certainly need to be completely rewritten for saga
export const setCampaignDates = (firstDayStart, firstDayEnd, campaignLength) => {
  const dateArray = [];
  let start;
  let end;

  for (let i=0; i < campaignLength; i++) {
    start = new Date(firstDayStart);
    end = new Date(firstDayEnd);
    dateArray.push({
      day: i + 1,
      start: new Date(start.setDate(start.getDate() + i)),
      end: new Date(end.setDate(end.getDate() + i)),
    });
  }

  return ({
    type: c.SET_CAMPAIGN_DATES,
    campaignDateArray: dateArray,
  });
}


export const setCampaignSteps = (array) => ({
    type: c.SET_STEPS,
    campaignDateArray: array,
  })
