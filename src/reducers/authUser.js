import { SET_AUTHED_USER, UNSET_AUTHED_USER } from '../actions/authUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case UNSET_AUTHED_USER:
      return state.filter(item => item !== 'authedUser');
    default:
      return state;
  }
}
