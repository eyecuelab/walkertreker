{
  player: {
    id: null,
    displayName: null,
    phoneNumber: null,
    inActiveGame: false,
    campaignId: null,
    health: null,
    hunger: null,
    steps: [],
  },
  campaign: {
    id: null,
    startDate: null,
    endDate: null,
    currentDay: 0,
    length: "15",
    difficultyLevel: "easy",
    randomEvents: "low",
    numPlayers: 0,
    stepTargets: [2000,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // i don't know if this will actually ever be used past establishing the first day's step target.  we might be able to convert this data type to just a single number
    inventory: {
        foodItems: 0,
        weaponItems: 0,
        medicineItems: 0
    },
    players: [ /* contains an array of objects in the exact format as the player objects in the player state slice.  the player state slice will, in fact, be one of the objects in here */]
  },
  appState: 'active',
  steps: {
    campaignDateArray: null,
    isGettingSteps: false,
    error: null // this we might just be able to dump
  }
}
