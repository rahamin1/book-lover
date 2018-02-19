import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Alert } from 'reactstrap';
import { getBookDescription } from '../../actions/actions_books_search';
import { addBook } from '../../actions/actions_books_add';
import { getParam } from '../utils/get_param';
import Select from '../form/select';

class BookDetails extends React.Component {

  constructor(props) {
    super(props);
    this.logBookError = this.logBookError.bind(this);
    this.addSelectedBook = this.addSelectedBook.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCatSelect = this.handleCatSelect.bind(this);
    this.getCatList = this.getCatList.bind(this);

    // bookAdded marks if book details are from search results
    // but it has already been added to the library
    let bookAdded = false;

    // inLibrary marks whether book from library or from
    // search results. If from search,
    // fetch its description from GoodReads (otherwise we
    //  fetched it already when we added it).
    //
    // inLibrary can have one of three values:
    // (1) "true" - book is displayed from the library
    // (2) "false" - book is displayed from search results
    // (3) "added" - book is displayed from search results,
    //      but exists in the library, too.
    let inLibrary;
    const libraryParam = getParam(this.props.location.search, "inLibrary");
    if (libraryParam === "true") {
      inLibrary = true;
    } else {
      inLibrary = false;
      if (libraryParam === "added")
        bookAdded = true;
    }

    const catId = getParam(this.props.location.search, "catId");
    const arr = this.getCatList();
    this.state = {
      inLibrary: inLibrary,
      catId: catId,
			catSelection: catId,
      catOptions: arr,
      bookAdded: bookAdded
    };
  }

  componentDidMount() {
    if (!this.state.inLibrary) {
      this.props.getBookDescription(this.props.match.params.bookId);
    }
  }

  render() {
    const id = this.props.match.params.bookId;
    let book;

    // 'searchedBookInLibrary' indicates whether the book
    // is already in the library. Initialized to false.
    // There are two variables indicating that the book is
    // from search results but exists in the library:
    // searchedBookInLibrary and bookAdded.
    //
    // The difference between them is that if bookAdded === true
    // indicates that the book has been found in the library
    // before rendering BookDetails.
    // if bookAdded is false, and searchedBookInLibrary is true
    // it means that the book was added inside the BookDetails page
    //
    // These values are used for displaying different messages
    // regarding the fact that the book is in the library
    let searchedBookInLibrary = false;

    if (this.state.inLibrary) {

      // book retrieved from library
      if (this.props.booksList.data && this.props.booksList.data.hasOwnProperty(id)) {
        book = this.props.booksDetails.data[id];
      } else {

        // error: the book has not been found
        this.logBookError(this.state.inLibrary, id);
        return (
          <Container>
            {this.bookNotFound()}
          </Container>
        );
      }
    } else {

      // book from search results
      // check if it already exists in Library
      if (this.props.booksList.data.hasOwnProperty(id)) {
        searchedBookInLibrary = true;
        book = this.props.booksDetails.data[id];
      } else if (this.props.bookResults &&
        this.props.bookResults.data &&
        this.props.bookResults.data.hasOwnProperty(id)) {
        book = this.props.bookResults.data[id];
      } else {

        // error: the book wasn't found in the serarch results
        this.logBookError(this.state.inLibrary, id);
        return (
          <Container>
            {this.bookNotFound()}
          </Container>
        );
      }
    }

    return (
      <Container>
        <Row>
          <Col xs="3">
            <img src={book.image} alt={book.name} style={{ width: "100%" }}/>
          </Col>
          <Col xs="9">
            <h2>{book.title}</h2>
            <h4>Author: {book.author}</h4>
            <br />
            <h6>Published on: {book.year}</h6>
            <h6>Rating on Goodreads: {book.rating}</h6>
            <p dangerouslySetInnerHTML={{ __html: book.description }} />
          </Col>
        </Row>
        <br />
        {!this.state.inLibrary && !searchedBookInLibrary &&
          this.state.catOptions && this.state.catOptions !== [] && this.renderButtons()}
        {this.renderMessage(searchedBookInLibrary)}
      </Container>
    );
  }

  handleCatSelect(e) {

    // e.target.value is the selected category string
    this.setState({ catSelection: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState(() => {
      return { inputInProcess: false };
    });

    this.addSelectedBook();
  }

  bookNotFound() {
    return (
      <Container>
        <Row>
          <h2>Oops...<br />
          The book details have not been found...</h2>
        </Row>
      </Container>
    );
  }

  logBookError(inLibrary, id) {
    const books = inLibrary ? this.props.booksDetails.data : this.props.bookResults.data;
      console.warn(`* In BookDetails/render. Didn't find book id. ` +
        `inLibrary=${inLibrary}; id=${id}; book list=${books}`);
      console.warn(books);
  }

  renderButtons() {
    const colWidth = { xl: "12", md: "12", sm: "12", xs: "12" };

    return (
      <div>
        <br />
        <Row className="justify-content-center">
          <Form onSubmit={this.handleFormSubmit}>
            <Select
              name={'category'}
              placeholder={'Choose category'}
              required={true}
              controlFunc={this.handleCatSelect}
              options={this.state.catOptions}
              selectedOption={this.state.catSelection}
              colWidth = {colWidth} />

            <FormGroup>
              <Button color="primary"
                onClick={this.handleFormSubmit}
                style={{ color: "white" }}>
                  Add To Library
              </Button>
            </FormGroup>
          </Form>
        </Row>
      </div>
    );
  }

  renderMessage(searchedBookInLibrary) {
    const addBookInProcess = this.props.booksList.data.addBookInProcess;
    const addBookError = this.props.booksList.data.addBookError;
    if (addBookInProcess) {
      return (
        <Row className="justify-content-center">
          <Alert color="info">
            Adding book to library...
          </Alert>
        </Row>
      );
    } else if (!addBookInProcess && addBookError) {
      return (
        <Row className="justify-content-center">
          <Alert color="danger">
            Failed to add book.
            <br />Check you internet connection and try to refresh the page.
          </Alert>
        </Row>
      );
    } else if (this.state.bookAdded) {
      return (
        <Row className="justify-content-center">
          <Alert color="info">
            This book is in the library.
          </Alert>
        </Row>
      );
    } else if (searchedBookInLibrary)
    return (
      <Row className="justify-content-center">
        <Alert color="info">
          The book has been added to the library.
        </Alert>
      </Row>
    );
  }

  addSelectedBook() {
    const id = this.props.match.params.bookId;
    const catSelection = this.state.catSelection;
    const book = this.props.bookResults.data[id];

    this.props.addBook(this.props.loginEmail, book, catSelection);
  }

  getCatList() {
    const cats = this.props.cats.data;
    let catsArr = [];
    if (cats != null) {
      for (var key in cats) {
        catsArr.push(key);
      }
    }
    return catsArr;
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.booksList,
    booksDetails: state.booksDetails,
    bookResults: state.bookResults,
    cats: state.cats,
    loginEmail: state.auth.loginEmail
  };
}

export default connect(mapStateToProps,
  { getBookDescription, addBook })(BookDetails);
