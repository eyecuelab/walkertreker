import constants from './../../constants';
const { c } = constants;


export default (state = {redirectAction : null, path: null, queryParams: null }, action) => {
  let newState;

  switch (action.type) {
  case c.SET_REDIRECT_PATH_AND_PARAMS:
    newState = Object.assign({}, state, {path: action.path, queryParams: action.queryParams} );
    return newState;

  case c.SET_REDIRECT_ACTION:
    console.log("setting redirect action in state");
    newState = Object.assign({}, state, { redirectAction : action.redirectAction } );
    return newState;

  case c.CLEAR_REDIRECT_ACTION:
    console.log("RESETTING STATE OF REDIRECT STARTING STATE", state);
    newState = Object.assign({}, state, { redirectAction : null, path: null, queryParams: null });
    console.log("STATE AFTER RESET ", newState);
    return newState;
  
  default:
    return state;
  }
}
