import constants from '../constants/actionTypes'

var initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    email: localStorage.getItem('email') ? localStorage.getItem('email') : ''
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state);

  switch(action.type) {
    case constants.USER_REGISTERED:
      updated['loggedIn'] = true;
      updated['email'] = action.email;
      return updated;

    case constants.USER_LOGGEDIN:
      updated['loggedIn'] = true;
      updated['email'] = action.email;
      return updated;

    case constants.USER_LOGOUT:
      updated['loggedIn'] = false;
      updated['email'] = '';
      return updated;

    default:
      return state;
    }
}