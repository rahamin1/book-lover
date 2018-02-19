import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardSubtitle, CardText, CardBody, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Cat extends React.Component {

  render() {
    const cat = this.props.cat;

    return (
      <Col xs="7" sm="5" md="4" lg="3" xl="3"
        style={{ margin: "0 10px 10px 0",
        border: "1px solid black", borderRadius: "10px" }}>
        <Link to={`/books/${cat.id}`}>
        <Card style={{ border: "1px solid white" }}>
          <CardImg top className="h-100"
            src={cat.image} alt={cat.id} />
          <CardBody>
            <CardSubtitle>{cat.id}</CardSubtitle>
            <CardText></CardText>
          </CardBody>
        </Card>
      </Link>
      </Col>
    );
  }
}

Cat.PropTypes = {
  cat: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired
};
