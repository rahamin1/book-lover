import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import _ from 'lodash';
import Book from './book';

class BookResults extends React.Component {

  render() {

    let books;
    const catId = this.props.match.params.catId;

    // inLibrary marks for the Book component that book information
    // is received from search results and not from library.
    // This is need in the BookDetails component
    // and will be passed from the Book component
    // inLibrary can take the following values:
    //  "false" - book from search results and not in library
    //  "added" - book from search results but exists in library
    let inLibrary;
    const booksArray = _.values(this.props.bookResults.data);
    const booksList = this.props.booksList.data;

    if (booksArray.length === 0) {
      books = "No books to display";
    } else {
      books = booksArray.map( (book) => {
        inLibrary = (booksList.hasOwnProperty(book.id)) ?
          "added" : "false";
        return (
          <Book book={book} key={book.id} bookId={book.id}
            inLibrary={inLibrary} catId={catId} />
        );
      });
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <h2>
          Search Results
          </h2>
        </Row>
        <Row className="justify-content-center">
          <h6><i>
            Click on a book to get further details
            and (optionally) to add to your library
          </i></h6>
        </Row>
        <Row className="justify-content-center">
          {books}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookResults: state.bookResults,
    booksList: state.booksList,
    cats: state.cats
  };
}

export default connect(mapStateToProps)(BookResults);
