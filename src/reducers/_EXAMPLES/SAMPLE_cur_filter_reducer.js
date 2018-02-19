import { SET_FILTER } from '../actions/index';

export default function CurFilterReducer(state = 'ALL', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
      break;
    default:
      return state;
  }
}
