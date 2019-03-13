export const NAVIGATION = {
  campaignStarted: 'CampaignSummary',
  campaignDeleted: 'About',
  campaignIsLost: 'CampaignIsLost',
  campaignIsWon: 'CampaignIsWon',
  randomEventStart: 'RandomEvent',
  randomEventEnd: 'RandomEventResult',
  weDidntMakeIt: 'EndOfDaySummary',
  weMadeIt: 'Safehouse',
  noPlayerSteps: 'none',
  hungerAlert: 'none',
}

// NAVIGATION[type] returns one of the above, a route we would like the app to navigate to. If NAVIGATION[type] == 'none', we do not want to trigger a navigation event. Keeping this in a constants file and sharing it with both Start.js initial navigation and NotificationListeners that fire when the app is already open
