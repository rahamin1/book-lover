import React from 'react';
import { Container, Jumbotron, ListGroup, ListGroupItem,
  ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const howto = "Start by doing (1) or (2), then continue to 3.";
const howto1 = "In the home page click on 'Login', " +
  "type 'test@mail.com' for username and '123456' for password. " +
  "Now click on 'Book-Categories', on a category, on books... " +
  "Then continue to (3)";
const howto2 = "or, in the home page, click on 'Sign Up' " +
  "and the rest is starightforward...";
const howto3 = "Click on 'Book-Categories' (top right), " +
  "select a name for a new 'category' and select an image " +
  "that will represent the category.";
const howto4 = "Click on the category that you have defined, " +
  "search for books, click on a book and add it to the category.";
const howto5 = "Same as for the first categoty and the first book.";
const howto6 = "Go to a category, click on it, see the books " +
  " that belong to it, click on a book to get its details...";
const howto7 = "This is my first react/redux/bootstrap/firebase " +
  " mini-project. Not too fancy, helped me learn plenty of things. " +
  "I am happy with it. Almost... :)";

export default class Example extends React.Component {
  render() {
    return (
      <Container>
        <Jumbotron>
          <h2 style={{ color: "#161de0" }}>How to Use This Site:</h2>
          <br />
          <ListGroup>
            <ListGroupItem className="listGroup1">
              <ListGroupItemHeading className="listHeading">Start in (1) or (2):</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup2">
              <ListGroupItemHeading className="listHeading">(1) Login using an existing account</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto1}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup1">
              <ListGroupItemHeading className="listHeading">(2) Create an Account</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto2}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup2">
              <ListGroupItemHeading className="listHeading">(3) Create Categories</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto3}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup1">
              <ListGroupItemHeading className="listHeading">(4) Add Books</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto4}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup2">
              <ListGroupItemHeading className="listHeading">(5) Continue Adding Categories and Books</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto5}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup1">
              <ListGroupItemHeading className="listHeading">(6) Browse your Library</ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto6}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem className="listGroup2">
              <ListGroupItemHeading className="listHeading">(7) Remember! </ListGroupItemHeading>
              <ListGroupItemText className="listText">
                {howto7}
              </ListGroupItemText>
            </ListGroupItem>
          </ListGroup>
        </Jumbotron>
      </Container>
    );
  }
}
