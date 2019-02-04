import constants from '../constants';
const { c, initialState } = constants;

export default (state = initialState.demo, action) => {
  let newState;
  switch (action.type) {

  case c.TOGGLE:
    let toggledValue = state.reduxWorks;
    toggledValue = !toggledValue;
    newState = Object.assign({}, state, {
      reduxWorks: toggledValue
    });
    return newState;

  default:
    return state;
  }
};
