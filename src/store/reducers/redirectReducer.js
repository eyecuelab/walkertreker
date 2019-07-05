import constants from './../../constants';
const { c } = constants;


export default (state = {path : null, queryParams: null}, action) => {
  let newState;

  switch (action.type) {

  case c.SET_REDIRECT_ACTION:
    console.log("Action in redirect is ", action);
    newState = Object.assign({}, state, {path : action.path}, {queryParams : action.queryParams}  );
    console.log(newState)
    return newState;

  case c.CLEAR_REDIRECT_ACTION:
    console.log("RESETTING STATE OF REDIRECT STARTING STATE", state);
    newState = Object.assign({}, state, {path : null, queryParams: null});
    console.log("STATE AFTER RESET ", newState);
    return newState;
  
  default:
    return state;
  }
}
