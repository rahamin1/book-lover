import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchBooksList } from '../../actions/actions_fetch_books_list';
import { fetchBooksDetails } from '../../actions/actions_fetch_books_details';
import Book from './book';

class Books extends React.Component {

  componentDidMount() {
    const loginEmail = this.props.loginEmail;
    if (loginEmail && loginEmail !== "") {
      this.props.fetchBooksList(this.props.loginEmail);
      this.props.fetchBooksDetails();
    }
  }

  render() {

    const catId = this.props.match.params.catId;

    const fetchingInProcess =
      this.props.booksList.fetchingBooksListInProcess ||
      this.props.booksDetails.fetchingBooksDetailsInProcess;

    const fetchingError =
      this.props.booksList.fetchingBooksListError ||
      this.props.booksDetails.fetchingBooksDetailsError;

    const booksReady =
      !fetchingInProcess && !fetchingError;

    const booksList = this.props.booksList.data;
    const booksDetails = this.props.booksDetails.data;

    let books = [];
    if (booksReady) {
      let booksListArray = [];
      for (var key in booksList) {
        booksListArray.push({ id: key, ...booksList[key], ...booksDetails[key] });
      }

      // inLibrary marks for the Book component that book information
      // is received from library (and not from search results)
      // This is need in the BookDetails component
      // and will be passed from the Book component
      const inLibrary = "true";

      books = booksListArray.filter( (book) => {
        return book.catId === catId;
      }).map( (book) => {
        return (
          <Book book={booksDetails[book.id]} bookId={book.id}
          key={book.id} inLibrary={inLibrary} catId={catId} />
        );
      });
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <h2>
          My Favourite {catId} Books
          </h2>
        </Row>
        <Row className="justify-content-center">
          <h6><i>
            Click on a book to get further details
          </i></h6>
        </Row>
        {this.renderMessage(fetchingInProcess, fetchingError, books.length)}
        <Row className="justify-content-center">
          {booksReady ? books : null}
        </Row>
        {this.renderButtons(catId, books.length)}
      </Container>
    );
  }

  renderButtons(catId, booksCount) {
    const additional = booksCount === 0 ? "" : "additional ";
    return (
      <div>
        <br />
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button color="primary">
              <Link to={`/search_books/${catId}`}
                style={{ color: "white" }}>
                Search for {additional} Book&#40;s&#41;
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  renderMessage(fetchingInProcess, fetchingError, booksCount) {
    if (fetchingInProcess) {
      return (
        <Row className="justify-content-center">
          <Alert color="info">
            Retrieving the books...
          </Alert>
        </Row>
      );
    } else if (!fetchingInProcess && fetchingError) {
      return (
        <Row className="justify-content-center">
          <Alert color="danger">
            Failed to retrieve the books.
            <br />Check you internet connection and try to refresh the page.
          </Alert>
        </Row>
      );
    } else if (booksCount === 0) {
      return (
        <Row className="justify-content-center">
          <Alert color="info" align="center" >
            You don't have any books in this category.<br />
            Click on search, and then add your favorite books to your library.
          </Alert>
        </Row>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.booksList,
    booksDetails: state.booksDetails,
    cats: state.cats,
    loginEmail: state.auth.loginEmail
  };
}

export default connect(mapStateToProps,
  { fetchBooksList, fetchBooksDetails })(Books);
