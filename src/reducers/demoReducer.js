import initialStateDemoReducer from '../constants/initialStates/initialStateDemoReducer';

export default (state = initialStateDemoReducer, action) => {
  let newState;
  switch (action.type) {

  case 'TOGGLE':
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
