import * as actions from './action_types';
import { encodeUserEmail } from './index';
import { fire, checkConnection } from './index';

export function addCat(data, loginEmail) {
  if (!data.category || data.category === "") {
    console.error("*** ERROR *** In actions/addCat." +
    "cat: ", data.category);
  } else {
    return (dispatch => {
      dispatch(addCatStart());
      const catImage = data.catImageBase64;
      const image = (catImage && catImage !== "") ?
        catImage : "/assets/images/cats/new.jpg";
      const newCatName = data.category;

      const email = encodeUserEmail(loginEmail);
      const newCatRef = fire.database().ref(`cats/${email}/${newCatName}`);

      checkConnection.on('value', function(snapshot) {
        if (snapshot.val() === true) {  /* we're connected! */
          newCatRef.set({
            image: image
          })
            .then(response => {
              dispatch(addCatToStore(newCatName, image));
            })
            .catch(error => {
              console.error(`In actions/addCat. Failed to add category to database.` +
                ` data: ${data}, error: ${error}`);
              dispatch(addCatError(error));
            });
        } else {  /* we're disconnected! */
          dispatch(addCatError("Check you internet connection and try to refresh the page."));
        }
      });
    });
  }
}

function addCatStart() {
  return {
    type: actions.ADD_CAT_START
  };
}

function addCatToStore(newCatName, image) {
  return {
    type: actions.ADD_CAT_TO_STORE,
    newCatName: newCatName,
    image: image
  };
}

function addCatError(error) {
  return {
    type: actions.ADD_CAT_ERROR,
    error: error
  };
}

export function fetchCats(loginEmail) {
  if (!loginEmail || loginEmail === "") {
    console.warn("In actionCats/fetchCats. loginEmail undefined or empty string");
  } else {
    return function(dispatch) {
      dispatch(fetchCatsStart());
      let data = {};
      const email = encodeUserEmail(loginEmail);

      const catsRef = fire.database().ref(`cats/${email}`);

      checkConnection.on('value', function(snapshot) {
        if (snapshot.val() === true) {  /* we're connected! */
          catsRef.on('value', snapshot => {
            data = snapshot.val();
            if (data)
              dispatch(fetchCatsToStore(data));
            else {   // console.warn("In actionCats/fetchCats. data: ", data);
              dispatch(fetchCatsDone());
            }
          });
        } else {  /* we're disconnected! */
          dispatch(fetchCatsError());
        }
      });
    };
  }
}

function fetchCatsStart() {
  return {
    type: actions.FETCH_CATS_START
  };
}

function fetchCatsToStore(data) {
  return {
    type: actions.FETCH_CATS_TO_STORE,
    payload: data
  };
}

function fetchCatsDone() {
  return {
    type: actions.FETCH_CATS_DONE
  };
}

function fetchCatsError() {
  return {
    type: actions.FETCH_CATS_ERROR
  };
}
