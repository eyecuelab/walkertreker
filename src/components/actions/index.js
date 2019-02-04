import constants from '../../constants';
const { c } = constants;

export const setAppState = (appState) => ({
  type: c.NEW_APP_STATE,
  appState,
});

export const setCampaignDates = (firstDayStart, firstDayEnd, campaignLength) => {

  const dateArray = [];

  for (let i=0; i < campaignLength; i++) {
      const start = new Date(firstDayStart); /* using campaignStartDate directly here caused the app to crash... not sure why*/
      const end = new Date(firstDayEnd); /* using campaignStartDate directly here caused the app to crash... not sure why*/
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
