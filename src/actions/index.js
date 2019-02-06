import constants from '../constants';
const { c } = constants;

export const setAppState = (appState) => ({
  type: c.NEW_APP_STATE,
  appState: appState,
});

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
