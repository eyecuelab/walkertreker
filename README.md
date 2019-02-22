# Walker Trekker
## Motivating human people to walk more

### _They're right behind you..._

#### Dispatching actions
##### Here are the actions and payloads needed to dispatch actions to the server:

- Create Campaign
  - type: `c.SET_INITIAL_CAMPAIGN_DETAILS`
  - payload: ```{
    "params": {
      "campaignLength": campaign.length,
      "difficultyLevel": campaign.difficultyLevel,
      "randomEvents": campaign.randomEvents,
    },
    "playerId": player.id,
    }}```
- Destroy Campaign
  - type: `c.DESTROY_CAMPAIGN`
  - campId: `campaign.id`
- Fetch Campaign
  - type: `c.FETCH_CAMPAIGN_INFO`
  - id: `campaign.id`
- Invite to Campaign
  - type: `c.SEND_INVITES`
  - campId: `campaign.id`
  - playId: `player.id`
  - invites: `[array] of contacts gathered from the device`
- Join Campaign
  - type: `c.SEND_JOIN_CAMPAIGN_REQUEST`
  - campId: `campaign.id`
  - playId: `player.id`
- Leave Campaign
  - type: `c.LEAVE_CAMPAIGN`
  - campId: `campaign.id`
  - playId: `player.id`
- Start Campaign
  - type: `c.START_CAMPAIGN`
  - campId: `campaign.id`
  - startNow: `[boolean] ? campaign starts instantly : campaign start tomorrow morning`
- Update Campaign
  - type: `c.UPDATE_CAMPAIGN`
  - campId: `campaign.id`
  - currentDay: **optional** `[number] denoting day of campaign, from 0 to 90`
  - inventory: **optional** ```{
      foodItems: [number],
      weaponItems: [number],
      medicineItems: [number]
    }```
- Create Player
  - type: `c.CREATE_PLAYER`
  - name: `'Macho Man Randy Savage'`
  - number: `[number] which is the players phone number`
- Fetch Player
  - type: `c.FETCH_PLAYER`
  - playId: `player.id`
- Update Player
  - type: `c.UPDATE_PLAYER`
  - playId: `player.id`
  - hunger: **optional** `[number] from 0 to 100, with 100 meaning completely stuffed and 0 meaning dead of starvation`
  - health: **optional** `[number] from 0 to 100`
  - steps: **optional** `[array] of steps to date in the campaign; length should be equal to campaign length`
