import { combineReducers } from 'redux';
import CatsReducer from './reducer_cats';
import BooksDetailsReducer from './reducer_books_details';
import BooksListReducer from './reducer_books_list';
import bookResultsReducer from './reducer_book_results';
import modalsReducer from './reducer_modals';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
  cats: CatsReducer,
  booksList: BooksListReducer,
  booksDetails: BooksDetailsReducer,
  bookResults: bookResultsReducer,
  modals: modalsReducer,
  auth: authReducer
});

export default rootReducer;
