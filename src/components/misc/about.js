import React from 'react';
import { Container, Jumbotron, Card, CardImg, Row, Col } from 'reactstrap';

export default class About extends React.Component {

  render() {
    return (
      <Container>
        {this.about()}
      </Container>
    );
  }

  about() {

    const twoCities =
      "It was the best of times, it was the worst of times, " +
      "it was the age of wisdom, it was the age of foolishness, " +
      "it was the epoch of belief, it was the epoch of incredulity, " +
      "it was the season of Light, it was the season of Darkness, " +
      "it was the spring of hope, it was the winter of despair, " +
      "we had everything before us, we had nothing before us, " +
      "we were all going direct to Heaven, we were all going direct " +
      "the other way – in short, the period was so far like " +
      "the present period, that some of its noisiest authorities " +
      "insisted on its being received, for good or for evil, " +
      "in the superlative degree of comparison only.";

    return (
      <Jumbotron>
        <h1 style={{ color: "#161de0" }}>Hey, Book Lover!</h1>
        <p className="lead" style={{ color: "#2f70d8" }}>
          If quotes like the following excites you,
          this is the site for you. Explore, enjoy,
          and tell us how to improve!</p>
        <hr className="my-2" />
        <Row className="justify-content-center">
          <Col xs="8" sm="6" md="4" lg="3" xl="3">
            {this.image1()}
          </Col>
          <Col xs="8" sm="6" md="4" lg="3" xl="3">
            {this.image2()}
          </Col>
          <Col xs="8" sm="6" md="4" lg="3" xl="3">
            {this.image3()}
          </Col>
        </Row>
        <hr className="my-2" />
        <p style={{ fontStyle: "italic" }}>{twoCities}</p>
      </Jumbotron>
    );
  }

  image1() {
    return (
      <Card>
        <CardImg top width="100%" src="/assets/images/dickens/tale1.jpg"
        alt="A Tale of Two Cities" />
      </Card>
    );
  }

  image2() {
    return (
      <Card>
        <CardImg top width="100%" src="/assets/images/dickens/tale2.jpg"
        alt="A Tale of Two Cities" />
      </Card>
    );
  }

  image3() {
    return (
      <Card>
        <CardImg top width="100%" src="/assets/images/dickens/tale3.jpg"
        alt="A Tale of Two Cities" />
      </Card>
    );
  }
}
