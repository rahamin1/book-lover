import { combineReducers } from 'redux';
import ListReducer from './list_reducer';
import CurFilterReducer from './cur_filter_reducer';

const rootReducer = combineReducers({
  list: ListReducer,
  curFilter: CurFilterReducer
});

export default rootReducer;
