# Walker Trekker
## Motivating human people to walk more

### _They're right behind you..._

#### Dispatching actions
##### Here are the actions and payloads needed to dispatch actions to the server:

- **Create Campaign** - _returns a proto-campaign to state, containing campaign id, length, difficulty, and event frequency; adds host player to campaign players_
  - type: `c.SET_INITIAL_CAMPAIGN_DETAILS`
  - payload: ```{
    "params": {
      "campaignLength": campaign.length,
      "difficultyLevel": campaign.difficultyLevel,
      "randomEvents": campaign.randomEvents,
    },
    "playerId": player.id,
    }}```
- **Destroy Campaign** - _returns campaign state to its initial blank value_
  - type: `c.DESTROY_CAMPAIGN`
  - campId: `campaign.id`
- **Fetch Campaign** - _returns campaign to campaign state that matches the supplied campaign id_
  - type: `c.FETCH_CAMPAIGN_INFO`
  - id: `campaign.id`
- **Invite to Campaign** - _does not return anything to state; sends invites from the server_
  - type: `c.SEND_INVITES`
  - campId: `campaign.id`
  - playId: `player.id`
  - invites: `[array] of contacts gathered from the device`
- **Join Campaign** - _returns updated campaign to campaign state that matches the supplied campaign id_
  - type: `c.SEND_JOIN_CAMPAIGN_REQUEST`
  - campId: `campaign.id`
  - playId: `player.id`
- **Leave Campaign** - _returns campaign state to its initial blank value_
  - type: `c.LEAVE_CAMPAIGN`
  - campId: `campaign.id`
  - playId: `player.id`
- **Start Campaign** - _returns updated campaign to campaign state that matches the supplied campaign id_
  - type: `c.START_CAMPAIGN`
  - campId: `campaign.id`
  - startNow: `[boolean] ? campaign starts instantly : campaign start tomorrow morning`
- **Update Campaign** - _returns updated campaign to campaign state that matches the supplied campaign id_
  - type: `c.UPDATE_CAMPAIGN`
  - campId: `campaign.id`
  - currentDay: **optional** `[number] denoting day of campaign, from 0 to 89`
  - inventory: **optional** ```{
      foodItems: [number],
      weaponItems: [number],
      medicineItems: [number]
    }```
- **Create Player** - _returns newly-created player object to player state_
  - type: `c.CREATE_PLAYER`
  - name: `'Macho Man Randy Savage'`
  - number: `[number] which is the players phone number`
- **Fetch Player** - _returns requested player object to player state_
  - type: `c.FETCH_PLAYER`
  - playId: `player.id`
- **Update Player** - _returns updated player object to player state_
  - type: `c.UPDATE_PLAYER`
  - playId: `player.id`
  - hunger: **optional** `[number] from 0 to 100, with 100 meaning completely stuffed and 0 meaning dead of starvation`
  - health: **optional** `[number] from 0 to 100`
  - steps: **optional** `[array] of steps to date in the campaign; length should be equal to campaign length`
