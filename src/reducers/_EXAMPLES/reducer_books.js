import { books } from './initial_book_list';
import { ADD_BOOK_TO_LIBRARY } from '../actions/action_types';

export default function booksReducer(state = books, action) {

  //console.log("In booksReducer. action: ", action.error);
  //console.log("In booksReducer. payload: ", action.payload);

  switch (action.type) {

    // payload: { book: book, catId: this.state.catId }
    case ADD_BOOK_TO_LIBRARY: {
      let newBook = Object.assign({}, action.payload.book);
      newBook.catId = action.payload.catSelection;
      return Object.assign({}, state, { [newBook.id]: newBook });
    }

      //break;

    default:
      return state;
  }
}
