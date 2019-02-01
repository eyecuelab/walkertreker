import initialState from '../constants/initialState';

export default (state = initialState, action) => {
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

// switch (action.type) {
//   case c.ADD_TICKET:
//     newState = Object.assign({}, state, {
//       [id]: {
//         names: names,
//         location: location,
//         issue: issue,
//         timeOpen: timeOpen,
//         id: id,
//         formattedWaitTime: formattedWaitTime
//       }
//     });
//     return newState;
