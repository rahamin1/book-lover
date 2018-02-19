import axios from 'axios';

//import Firebase from 'firebase';
import * as actions from './action_types';

// constants used in the interface to the goodreads site,
// from which we get details of books
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const GOODREADS = "https://www.goodreads.com";
const GR_SEARCH = "/search/index.xml";
const GR_SHOW = "/book/show/";
const KEY = "?key=vVFRh9CNwReMOUE7rymyww";

export function searchForBooks(values, callback) {
  if (!values.searchText || values.searchText === "") {
    console.error("*** ERROR *** In actions/searchForBooks." +
    "values.searchText: ", values.searchText);
  } else {
    const searchUrl = `${GOODREADS}${GR_SEARCH}${KEY}&q=${values.searchText}`;

    return (dispatch) => {
      dispatch(searchForBooksInProcess());
      axios.get(proxyUrl + searchUrl)
        .then((result) => {
          dispatch(searchForBooksSuccess(result));
          callback();
        })
        .catch((err) => {
          console.error('in actions/searchForBooks. error:', err);
          dispatch(searchForBooksFailure(err));
        });
    };
  }
}

function searchForBooksInProcess() {
  return {
    type: actions.SEARCH_FOR_BOOKS_IN_PROCESS
  };
}

function searchForBooksSuccess(result) {
  return {
    type: actions.SEARCH_FOR_BOOKS_SUCCESS,
    payload: result
  };
}

function searchForBooksFailure(err) {
  return {
    type: actions.SEARCH_FOR_BOOKS_FAILURE,
    payload: err
  };
}

export function getBookDescription(bookId) {
  if (!bookId || bookId === "") {
    console.error("*** ERROR *** In actions/getBookDescription." +
    "bookId: ", bookId);
  } else {
    const searchUrl = `${GOODREADS}${GR_SHOW}${bookId}.xml${KEY}`;
    return (dispatch) => {
      axios.get(proxyUrl + searchUrl)
        .then((result) => {
          dispatch(getBookDescriptionSuccess(result));
        })
        .catch((err) => console.error('in actions/getBookDescription. error:', err));
    };
  }
}

function getBookDescriptionSuccess(result) {
  return {
    type: actions.GET_BOOK_DESC,
    payload: result
  };
}
