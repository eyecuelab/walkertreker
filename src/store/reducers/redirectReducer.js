import constants from './../../constants';
const { c } = constants;


export default (state = {redirectAction : null}, action) => {
  let newState;

  switch (action.type) {

  case c.SET_REDIRECT_ACTION:
    console.log("STORING REDIRECT OBJECT ", JSON.stringify(action.redirectAction));
    newState = Object.assign({}, state, {redirectAction : action.redirectAction});
    console.log(newState)
    return newState;

  case c.CLEAR_REDIRECT_ACTION:
    console.log("RESETTING STATE OF REDIRECT")
    newState = Object.assign({}, state, {redirectAction : null});
    console.log("STATE AFTER RESET ", newState)
    return newState;
  
  default:
    return state;
  }
}
