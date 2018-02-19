import axios from 'axios';
import { SEARCH_FOR_BOOKS, GET_BOOK_DESC,
  ADD_CAT, ADD_BOOK_TO_LIBRARY } from './action_types';

//const GOODREADS = "https://www.goodreads.com/search/index.xml";
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
      axios.get(searchUrl)
        .then((result) => {
          callback();
          dispatch(searchForBooksSuccess(result));
        })
        .catch((err) => console.error('in actions/searchForBooks. error:', err));
    };
  }
}

function searchForBooksSuccess(result) {
  return {
    type: SEARCH_FOR_BOOKS,
    payload: result
  };
}

export function getBookDescription(bookId) {

  if (!bookId || bookId === "") {
    console.error("*** ERROR *** In actions/getBookDescription." +
    "bookId: ", bookId);
  } else {
    const searchUrl = `${GOODREADS}${GR_SHOW}${bookId}.xml${KEY}`;
    return (dispatch) => {
      axios.get(searchUrl)
        .then((result) => {
          dispatch(getBookDescriptionSuccess(result));
        })
        .catch((err) => console.error('in actions/getBookDescription. error:', err));
    };
  }
}

function getBookDescriptionSuccess(result) {
  return {
    type: GET_BOOK_DESC,
    payload: result
  };
}

export function addBookToLibrary(bookAndCatId) {

  if (!bookAndCatId || bookAndCatId === {}) {
    console.error("*** ERROR *** In actions/addBookToLibrary." +
    "bookAndCatId: ", bookAndCatId);
  } else {
    return {
      type: ADD_BOOK_TO_LIBRARY,
      payload: bookAndCatId
    };
  }
}

export function addCat(cat) {
  if (!cat || cat === "") {
    console.error("*** ERROR *** In actions/addCat." +
    "cat: ", cat);
  } else {
    return {
      type: ADD_CAT,
      payload: cat
    };
  }
}
