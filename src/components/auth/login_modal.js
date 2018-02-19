import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/actions_modal';
import { signInUser } from '../../actions/actions_auth';
import { Form, FormGroup, Button, Col,
	Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SingleInput from '../form/single_input';

class LoginModal extends Component {

  constructor(props) {
		super(props);
		this.state = {

// username = SingleInput Component
			username: '',
			usernameValid: true,

// username = SingleInput Component
			password: '',
			passwordValid: true,

      inputInProcess: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.handleUsernameFocus = this.handleUsernameFocus.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
		this.usernameValidity = this.usernameValidity.bind(this);

    this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.passwordValidity = this.passwordValidity.bind(this);
  }

  render() {

		//const colWidth = { xl: "8", md: "8", sm: "10", xs: "12" };
		const colWidth = { xl: "8", md: "10", sm: "12", xs: "12" };

		return (
      <Modal isOpen={true} className={this.props.className}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
  				<Form onSubmit={this.handleFormSubmit}>

  					<SingleInput
  						inputType={'email'}
  						title={'Email address:'}
  						name={'username'}
  						changeFunc={this.handleUsernameChange}
  		        blurFunc={this.handleUsernameBlur}
  						focusFunc={this.handleUsernameFocus}
  						content={this.state.username}
  						placeholder={''}
  					 	valid={this.state.usernameValid}
  					 	feedBack = {'Text input is required!'}
  						colWidth = {colWidth} />

            <SingleInput
  						inputType={'password'}
  						title={'Password:'}
  						name={'password'}
  						changeFunc={this.handlePasswordChange}
  		        blurFunc={this.handlePasswordBlur}
  						focusFunc={this.handlePasswordFocus}
  						content={this.state.password}
  						placeholder={''}
  					 	valid={this.state.passwordValid}
  					 	feedBack = {'Password is required!'}
  						colWidth = {colWidth} />

            <FormGroup>
              <Col {...colWidth}>
              <Button color="link"
                onClick={this.handleClearForm}>Clear form
              </Button>
              <Button color="secondary"
                onClick={() => this.props.hideModal()}>
                Cancel</Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
              </Col>
            </FormGroup>
          </Form>

          <FormGroup>
            <Col {...colWidth}>
              { !this.props.authInProcess &&
								!this.state.inputInProcess &&
								this.props.authError &&
                <Alert color="danger">
                  Unable to login: {this.props.authError}
                </Alert>
              }
            </Col>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    );
  }

  // username functions

	handleUsernameFocus() {

		//console.log('onFocus Username / e.target.value:', e.target.value);
		this.setState( { usernameValid: true,
		 		inputInProcess: true });
	}

	handleUsernameChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ username: e.target.value }, () => {
		});
	}

	handleUsernameBlur() {
		this.setState({ usernameValid: this.usernameValidity() }, () => {
		});
		this.usernameValidity();
	}

	usernameValidity() {
		const valid = (this.state.username !== false) &&
			(this.state.username.replace(/\s/g, '').length !== 0);

		this.setState({ usernameValid: valid });
		return valid;
	}

  // password functions

	handlePasswordFocus() {
		this.setState( { passwordValid: true,
		 		inputInProcess: true });
	}

	handlePasswordChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ password: e.target.value }, () => {
		});
	}

	handlePasswordBlur() {
		this.setState({ passwordValid: this.passwordValidity() }, () => {
		});
		this.passwordValidity();
	}

	passwordValidity() {
		const valid = (this.state.password !== false) &&
			(this.state.password.replace(/\s/g, '').length !== 0);

		this.setState({ passwordValid: valid });
		return valid;
	}

  handleClearForm(e) {
		e.preventDefault();
		this.setState({
			username: '',
			usernameValid: true,
      password: '',
      passwordValid: true,
			inputInProcess: true
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.setState(() => {
			return { inputInProcess: false };
		});

		const formPayload = {
			email: this.state.username,
      password: this.state.password
		};
		if (!this.formValidity())
			return false;

    this.props.signInUser(formPayload);
	}

	formValidity() {
		return (this.state.categorySelection !== "" &&
			this.usernameValidity());
	}

}

function mapStateToProps(state) {
	return {
		authError: state.auth.error
	};
}

export default connect(mapStateToProps,
  { hideModal, signInUser })(LoginModal);
