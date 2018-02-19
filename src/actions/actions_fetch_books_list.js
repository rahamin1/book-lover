import * as actions from './action_types';
import { encodeUserEmail } from './index';
import { fire, checkConnection } from './index';

export function fetchBooksList(loginEmail) {
  if (!loginEmail || loginEmail === "") {
    console.warn("In actionFetchBooksList/fetchBooksList. loginEmail undefined or empty string");
  } else {
    return function(dispatch) {
      dispatch(fetchBooksListStart());
      let data = {};
      const email = encodeUserEmail(loginEmail);

      const booksListRef = fire.database().ref(`bookList/${email}`);

      checkConnection.on('value', function(snapshot) {
        if (snapshot.val() === true) {  /* we're connected! */
          booksListRef.on('value', snapshot => {
            data = snapshot.val();
            if (data)
              dispatch(fetchBooksListToStore(data));
            else {

              // console.warn("In actionFetchBooksList/fetchBooksList. data: ", data);
              dispatch(fetchBooksListDone());
            }
          });
        } else {  /* we're disconnected! */
          dispatch(fetchBooksListError());
        }
      });
    };
  }
}

function fetchBooksListStart() {
  return {
    type: actions.FETCH_BOOKS_LIST_START
  };
}

function fetchBooksListToStore(data) {
  return {
    type: actions.FETCH_BOOKS_LIST_TO_STORE,
    payload: data
  };
}

function fetchBooksListDone() {
  return {
    type: actions.FETCH_BOOKS_LIST_DONE
  };
}

function fetchBooksListError() {
  return {
    type: actions.FETCH_BOOKS_LIST_ERROR
  };
}
