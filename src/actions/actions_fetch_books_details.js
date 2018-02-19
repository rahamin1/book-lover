import * as actions from './action_types';
import { fire, checkConnection } from './index';

export function fetchBooksDetails() {

  return function(dispatch) {
    dispatch(fetchBooksDetailsStart());
    let data = {};

    const booksDetailsRef = fire.database().ref(`bookDetails`);

    checkConnection.on('value', function(snapshot) {
      if (snapshot.val() === true) {  /* we're connected! */
        booksDetailsRef.on('value', snapshot => {
          data = snapshot.val();
          if (data)
            dispatch(fetchBooksDetailsToStore(data));
          else {
            console.warn("In actionFetchBooksDetails/fetchBooksDetails. data: ", data);
            dispatch(fetchBooksDetailsDone());
          }
        });
      } else {  /* we're disconnected! */
        dispatch(fetchBooksDetailsError());
      }
    });
  };
}

function fetchBooksDetailsStart() {
  return {
    type: actions.FETCH_BOOKS_DETAILS_START
  };
}

function fetchBooksDetailsToStore(data) {
  return {
    type: actions.FETCH_BOOKS_DETAILS_TO_STORE,
    payload: data
  };
}

function fetchBooksDetailsDone() {
  return {
    type: actions.FETCH_BOOKS_DETAILS_DONE
  };
}

function fetchBooksDetailsError() {
  return {
    type: actions.FETCH_BOOKS_DETAILS_ERROR
  };
}
