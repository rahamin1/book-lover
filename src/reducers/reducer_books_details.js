import * as actions from '../actions/action_types';

const booksDetails = {
  data: {},

  fetchingBooksDetailsInProcess: true,
  fetchingBooksDetailsError: false,

  bookAddInProcess: false,
  bookAddError: false
};

export default function booksDetailsReducer(state = booksDetails, action) {

  switch (action.type) {
    case actions.INIT_USER_STATE: {
      return booksDetails;
    }

    case actions.ADD_BOOK_START: {
      return { ...state,
        bookAddInProcess: true, bookAddError: false };
    }

    case actions.ADD_BOOK_TO_STORE: {
      const data = { ...state.data, [action.bookId]: action.bookInBookDetails };
      return { ...state, data: data,
        bookAddInProcess: false, bookAddError: false };
    }

    case actions.ADD_BOOK_ERROR: {
      return { ...state,
        bookAddInProcess: false, bookAddError: action.error };
    }

    case actions.FETCH_BOOKS_DETAILS_START: {
      state = { ...state,
        fetchingBooksDetailsInProcess: true, fetchingBooksDetailsError: false };
      return state;
    }

    case actions.FETCH_BOOKS_DETAILS_TO_STORE: {
      state = { ...state, data: action.payload,
        fetchingBooksDetailsInProcess: false, fetchingBooksDetailsError: false };
      return state;
    }

    case actions.FETCH_BOOKS_DETAILS_DONE: {
      return { ...state,
        fetchingBooksDetailsInProcess: false, fetchingBooksDetailsError: false };
    }

    case actions.FETCH_BOOKS_DETAILS_ERROR: {
      return { ...state,
        fetchingBooksDetailsInProcess: false, fetchingBooksDetailsError: true };
    }

    default:
      return state;
  }
}
