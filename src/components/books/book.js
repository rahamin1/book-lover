import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardSubtitle, CardBody, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Book extends React.Component {

  render() {
    const book = this.props.book;
    const bookId = this.props.bookId;
    const catId = this.props.catId;
    const inLibrary = this.props.inLibrary;

    // routing parameters, passed to BookDetails in the Link tag
    // Two such parameters are provided:
    // - inLibrary: specifying if book info comes from library
    //   or from search results.
    //  It can have one of three values:
    //   - "true": from library
    //   - "false": from search results and doesn't exist in library
    //   - "added": from search results and exists in library
    //
    // - catId: category ID the book belongs to
    //    this is provided from both book list
    //        (library divided to categories)
    //    and from search results (search invoked from a category list)

    const routingParams = `?inLibrary=${inLibrary}&catId=${catId}`;
    const maxLen = 20;
    let title;

    if (!book.title || book.title.length === 0) {
      console.error(`In Book/render. problem in book title: ` +
        `book=${this.props.book}; inLibrary=${inLibrary}`);
        title = "Could not find book's title...";
    } else {
      title = this.firstWords(book.title, maxLen);
      title = title.replace(/,-:;\s*$/, "");
      if (book.title.length > maxLen)
        title += " ...";
    }

    return (
      <Col xs="6" sm="4" md="3" lg="3" xl="2"
        style={{ margin: "0 10px 10px 0",
        border: "1px solid black", borderRadius: "10px" }}>
        <Link to={`/bookdetails/${bookId}${routingParams}`}>
          <Card style={{ border: "1px solid white" }}>
            <CardImg top width="100%" src={book.image} alt={book.name} />
            <CardBody>
              <CardSubtitle>{title}</CardSubtitle>
            </CardBody>
          </Card>
        </Link>
      </Col>
    );
  }

  firstWords(str, maxLen) {
    if (!str || str.length === 0)
      return str;

    const strArr = str.split(/[ ]+/);
    if (strArr.length === 0)
        return str;

    const result = strArr.reduce( (newStr, word) => {
      if (newStr.length < maxLen)
        return (newStr + " " + word);
      else
        return newStr;
    });

    return result;
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  catId: PropTypes.string.isRequired,
  inLibrary: PropTypes.string.isRequired
};
