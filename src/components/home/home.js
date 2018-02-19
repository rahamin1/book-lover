import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/actions_modal';
import { Container, Row, Col, Button } from 'reactstrap';
import BooksCarousel from './books_carousel';
import LoginText from './login_text';
import WelcomeText from './welcome_text';
import LoadingText from './loading_text';
import MarketingStuff from './marketing_stuff';
import { LOGIN_MODAL, SIGNUP_MODAL } from '../modals_root/modals_root';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.welcome = this.welcome.bind(this);
  }

  render() {
    return (
      <Container fluid={true}>
        { this.welcome() }
        <Row style={{ margin: "5px" }}>
        </Row>
        <Row>
          <Col><MarketingStuff /></Col>
        </Row>
      </Container>
    );
  }

  welcome() {
    const loginEmail = this.props.loginEmail;
    if (loginEmail === null) // app starting; waiting for it to check whether there is a signed-in user
      return this.renderLoading();
    else if (loginEmail === "") // no signed-in user
      return this.renderNoSignedIn();
    else
      return this.renderSignedIn(loginEmail);
  }

  renderLoading() {
    return (
      <Row style={{ margin: "0px" }}>
        <Col xs="6">
          <BooksCarousel />
        </Col>
        <Col xs="6">
          <LoadingText />
        </Col>
      </Row>
    );
  }

  renderNoSignedIn() {
    return (
      <Row style={{ margin: "0px" }}>
        <Col xs="6" className="align-self-center">
          <BooksCarousel />
        </Col>
        <Col xs="6" className="align-self-center">
          <Row><LoginText /></Row>
          <Row>
            <Button color="info" size="lg" block
              onClick={() => this.props.showModal(SIGNUP_MODAL)}>
              <h6>Sign up!</h6>
            </Button>
          </Row>
          <Row className="float-right">
              <p>
                or
                <Button
                  color="link" size="lg"
                  onClick={() => this.props.showModal(LOGIN_MODAL)}>
                  login...
                </Button>
              </p>
          </Row>
        </Col>
      </Row>
    );
  }

  renderSignedIn(loginEmail) {
    return (
      <Row style={{ margin: "0px" }}>
        <Col xs="6">
          <BooksCarousel />
        </Col>
        <Col xs="6">
          <WelcomeText loginEmail={loginEmail} />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginEmail: state.auth.loginEmail
  };
}

export default connect(mapStateToProps, { showModal })(Home);
