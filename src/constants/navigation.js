export const NAVIGATION = {
  campaignStarted: 'CampaignSummary',
  campaignDeleted: 'About',
  campaignIsLost: 'EndOfGame',
  campaignIsWon: 'EndOfGame',
  randomEventStart: 'RandomEvent',
  randomEventEnd: 'CampaignSummary',
  endOfDayUpdate: 'EndOfDaySummary',
  noPlayerSteps: 'none',
  hungerAlert: 'none',
}

// NAVIGATION[type] returns one of the above, a route we would like the app to navigate to. If NAVIGATION[type] == 'none', we do not want to trigger a navigation event. Keeping this in a constants file and sharing it with both Start.js initial navigation and NotificationListeners that fire when the app is already open

// noPlayerSteps: no navigation, just ask player to open the app to update steps
// hungerAlert: no navigation, alert player that they are under 20 hunger and need to eat
