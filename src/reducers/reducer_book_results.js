import { parseString } from  'xml2js';
import _ from 'lodash';
import * as actions from '../actions/action_types';
import { printActionError, printPayloadError, printParseError,
  getBookDetails } from './reducer_helpers';

const bookResults = {
  data: {},
  dataFetched: false,
  isFetching: false,
  error: false
};

export default function bookResultsReducer(state = bookResults, action) {
  const reducerName = "bookResultsReducer";
  let foundError;

  switch (action.type) {

    case actions.SEARCH_FOR_BOOKS_IN_PROCESS:
      return {
        ...state,
        data: {},
        dataFetched: false,
        isFetching: true,
        error: false
      };

    case actions.SEARCH_FOR_BOOKS_SUCCESS:
      if (action.error) {  // error from goodreads search books
        printActionError(reducerName, actions.SEARCH_FOR_BOOKS_SUCCESS, action);
        foundError = true; // mark failure
      } else if (!action.payload || !action.payload.data) {
        printPayloadError(reducerName, actions.SEARCH_FOR_BOOKS_FAILURE, action);
        foundError = true;
      } else {
        parseString(action.payload.data, function(err, result) {
          if (err) {
            printParseError(reducerName, actions.SEARCH_FOR_BOOKS_FAILURE, err);
            foundError = true;
          } else {
            foundError = false;
            state = {
              ...state,
              data: getBooks(result),
              dataFetched: true,
              isFetching: false,
              error: false
            };
          }
        });
      }
      if (foundError) {
        state = {
          ...state,
          data: {},
          dataFetched: false,
          isFetching: false,
          error: true
        };
      }
      return state;

      case actions.SEARCH_FOR_BOOKS_FAILURE:
        console.error("In BookResultsReducer/SEARCH_FOR_BOOKS_FAILURE");
        return {
          ...state,
          data: {},
          dataFetched: false,
          isFetching: false,
          error: true
        };

      case actions.GET_BOOK_DESC:
        if (action.error) {  // error from goodreads 'show book'
          printActionError(reducerName, actions.GET_BOOK_DESC, action);
        } else if (!action.payload || !action.payload.data) {
          printPayloadError(reducerName, actions.GET_BOOK_DESC, action);
        } else {
          parseString(cleanXMLString(action.payload.data),
           function(err, result) {
            if (err) {
              printParseError(reducerName, actions.GET_BOOK_DESC, err);
            } else {
              const bookInfo = getBookDetails(result);
              const id = bookInfo.id;

              if (!(id in state.data)) {
                console.error(`In bookResultsReducer/GET_BOOK_DESC. ` +
                  `Cannot find book id in book results. id = ${id}`);
              } else {
                const newBook = { ...state.data[id], description: bookInfo.desc };
                const data = { ...state.data, [id]: newBook };
                state = { ...state, data };
              }
            }
          });
        }
        return state;

    default:
      return state;
  }
}

function getBooks(data) {

  const bookResults =  data.GoodreadsResponse.search[0].results[0].work;
  if (!bookResults || bookResults.length === 0) {
    return {};
  } else {
    const results = bookResults.map( (book) => {
      const bookInfo = book.best_book[0];
      return (
        { id: book.id[0]._,
          title:
            bookInfo.title &&
            bookInfo.title[0] ?
            bookInfo.title[0] : "No title specified",
          author:
            bookInfo.author &&
            bookInfo.author[0].name &&
            bookInfo.author[0].name[0] ?
            bookInfo.author[0].name[0] : "No author specified",
          image:
            bookInfo.image_url &&
            bookInfo.image_url[0] ?
            bookInfo.image_url[0] : "/assets/no_book_cover.jpg",
          year:
            book.original_publication_year &&
            book.original_publication_year[0] &&
            book.original_publication_year[0]._ ? book.original_publication_year[0]._ : "0000",
          rating:
            book.average_rating  &&
            book.average_rating[0] ?
            book.average_rating[0] : "0.0",
          description: '' }
      );
    });
    return _.mapKeys(results, 'id');
  }
}

// The following tries to workaround parseString errors
function cleanXMLString(str) {
  // for some reason, parseString had issues with & and - and \
  return str.replace(/&/g, "&amp;")
    .replace(/-/g, "&#45;")
    .replace(/\\/g, "&#92;");
}
