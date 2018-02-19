import * as actions from '../actions/action_types';

export default function CurUserReducer(state = null, action) {

  switch (action.type) {
    case actions.USER_SIGNED_IN:
      return action.username;

    case actions.USER_SIGNED_OUT:
      return null;

    default:
      return state;
  }
}
