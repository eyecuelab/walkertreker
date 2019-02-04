export default (state = {appState: 'active'}, action) => {
  switch (action.type) {
  case 'NEW_APP_STATE':
    return action.appState;
  default:
    return state;
  }
}
