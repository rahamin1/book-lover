import * as actions from '../actions/action_types';

const cats = {
  data: {},

  fetchingCatsInProcess: false,
  fetchingCatsError: false,

  catAddInProcess: false,
  catAddError: false
};

export default function CatsReducer(state = cats, action) {
  switch (action.type) {

    case actions.INIT_USER_STATE: {
      return cats;
    }

    case actions.ADD_CAT_START: {
      return { ...state,
        catAddInProcess: true, catAddError: false };
    }

    case actions.ADD_CAT_TO_STORE: {
      const newCatName = action.newCatName;
      const image = action.image;
      const data = { ...state.data, [newCatName]: { image: image } };
      return { ...state, data: data,
        catAddInProcess: false, catAddError: false };
    }

    case actions.ADD_CAT_ERROR: {
      return { ...state,
        catAddInProcess: false, catAddError: action.error };
    }

    case actions.FETCH_CATS_START: {
      state = { ...state,
        fetchingCatsInProcess: true, fetchingCatsError: false };
      return state;
    }

    case actions.FETCH_CATS_TO_STORE: {
      state = { ...state, data: action.payload,
        fetchingCatsInProcess: false, fetchingCatsError: false };
      return state;
    }

    case actions.FETCH_CATS_DONE: {
      return { ...state, data: action.payload,
        fetchingCatsInProcess: false, fetchingCatsError: false };
    }

    case actions.FETCH_CATS_ERROR: {
      return { ...state,
        fetchingCatsInProcess: false, fetchingCatsError: true };
    }

    default:
      return state;
  }
}
