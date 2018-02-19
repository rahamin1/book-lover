import * as actions from './action_types';
import { encodeUserEmail } from './index';
import { fire, checkConnection } from './index';

// Add a book to the database and to the store
export function addBook(email, book, cat) {

    // preparing book objects for writing in the database
    // There are two such objects:
    // (1) an item in the 'book list' in the database (consists
    //      of an id and a category, written under the current
    //      logged-in user)
    // (2) an item in the 'books details' in the database
    //      (list of books details for all users.
    //        this structure saves the need to hold
    //        multiple entries for the same book that
    //        is in the 'library' of multiple users)
    const bookInBookList = {
      catId: cat
    };

    const { title, author, image, rating, year, description } = book;
    const bookInBookDetails = {
        title: title,
        author: author,
        image: image,
        rating: rating,
        year: year,
        description: description
    };

  if (!book || book === {} || !cat || cat === "" ||
    !email || email === "") {
    console.error(`*** ERROR *** In action_books_add/addBook. book: ` +
      `${book}, cat: ${cat}, loginEmail: ${email}`);
  } else {
    return (dispatch => {
      dispatch(addBookStart());
      checkConnection.on('value', function(snapshot) {
        if (snapshot.val() === true) {  // we're connected! /

          // Preparing the updates object which will enable
          // us to write the two objects in one operation
          let updates = {};
          updates['/bookList/' + encodeUserEmail(email) + "/" + book.id] = bookInBookList;
          updates['/bookDetails/' + book.id] = bookInBookDetails;
          fire.database().ref().update(updates)
            .then(response => {
              dispatch(addBookToStore(book.id, bookInBookList, bookInBookDetails));
            })
            .catch(error => {
              console.error(`In action_books_add/addBook. Failed to add book to database.`);
              dispatch(addBookError(error));
            });
        } else {  // we're disconnected! /
          dispatch(addBookError("Check you internet connection and try to refresh the page."));
        }
      });
    });
  }
}

// Mark that we started an add-book operation
function addBookStart() {
  return {
    type: actions.ADD_BOOK_START
  };
}

// Adding the book details to the store, after succesfull
// update in the database
function addBookToStore(bookId, bookInBookList, bookInBookDetails) {
  return {
    type: actions.ADD_BOOK_TO_STORE,
    bookId: bookId,
    bookInBookList: bookInBookList,
    bookInBookDetails: bookInBookDetails
  };
}

function addBookError(error) {
  return {
    type: actions.ADD_BOOK_ERROR,
    error: error
  };
}
