/* eslint-disable prefer-object-spread */
import { v4 } from "uuid";
import constants from "../../constants";

const {
  c,
  initialState: { player }
} = constants;

export default (state = player, action) => {
  let newState;
  switch (action.type) {
    case c.PLAYER_CREATED:
      newState = Object.assign({}, state, action.player);
      return newState;
    case c.SEND_JOIN_CAMPAIGN_REQUEST:
      newState = {
        ...state,
        campaignId: action.campId
      };
      return newState;
    case c.PLAYER_FETCHED:
      newState = action.player;
      return newState;
    case c.PLAYER_UPDATED:
      newState = action.player;
      return newState;
    case c.ACCOUNT_RECOVERED:
      newState = action.player;
      return newState;
    case c.UPDATE_PLAYER_STEPS:
      newState = {
        ...state,
        steps: action.steps
      };
      return newState;

    case c.UPDATE_HUNGER:
      newState = {
        ...state,
        hunger: action.hunger
      };
      return newState;

    case c.UPDATE_HEALTH:
      newState = {
        ...state,
        health: action.health
      };
      return newState;

    default:
      return state;
  }
};
