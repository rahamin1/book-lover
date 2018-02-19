import * as actions from '../actions/action_types';

const booksList = {
  data: {},

  fetchingBooksListInProcess: true,
  fetchingBooksListError: false,

  bookAddInProcess: false,
  bookAddError: false
};

export default function booksListReducer(state = booksList, action) {

  switch (action.type) {

    case actions.INIT_USER_STATE: {
      return booksList;
    }

    case actions.ADD_BOOK_START: {
      return { ...state,
        bookAddInProcess: true, bookAddError: false };
    }

    case actions.ADD_BOOK_TO_STORE: {
      const data = { ...state.data, [action.bookId]: action.bookInBookList };
      return { ...state, data: data,
        bookAddInProcess: false, bookAddError: false };
    }

    case actions.ADD_BOOK_ERROR: {
      return { ...state,
        bookAddInProcess: false, bookAddError: action.error };
    }

    case actions.FETCH_BOOKS_LIST_START: {
      state = { ...state,
        fetchingBooksListInProcess: true, fetchingBooksListError: false };
      return state;
    }

    case actions.FETCH_BOOKS_LIST_TO_STORE: {
      state = { ...state, data: action.payload,
        fetchingBooksListInProcess: false, fetchingBooksListError: false };
      return state;
    }

    case actions.FETCH_BOOKS_LIST_DONE: {
      return { ...state,
        fetchingBooksListInProcess: false, fetchingBooksListError: false };
    }

    case actions.FETCH_BOOKS_LIST_ERROR: {
      return { ...state,
        fetchingBooksListInProcess: false, fetchingBooksListError: true };
    }

    default:
      return state;
  }
}
