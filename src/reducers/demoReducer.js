import initialStateDemoReducer from '../constants/initialStateDemoReducer';

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
