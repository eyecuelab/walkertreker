/* eslint-disable prefer-object-spread */
import constants from "../../constants";

const { c } = constants;

export default (state = {}, action) => {
  let newState;

  switch (action.type) {
    case c.SET_INVITATIONS:
      newState = Object.assign({}, state, action.invitations);
      return newState;

    default:
      return state;
  }
};
