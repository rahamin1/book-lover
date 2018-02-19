import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Button,
	Container, Row, Alert } from 'reactstrap';
import SingleInput from '../form/single_input';
import { searchForBooks } from '../../actions';

class SearchBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchTextValid: true,
			inputInProcess: true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.handleSearchTextFocus = this.handleSearchTextFocus.bind(this);
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchTextBlur = this.handleSearchTextBlur.bind(this);

		this.searchTextValidity = this.searchTextValidity.bind(this);
	}

	// searchText functions

	handleSearchTextFocus() {

		this.setState( { searchTextValid: true,
		 		inputInProcess: true });
	}

	handleSearchTextChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ searchText: e.target.value }, () => {
		});
	}

	handleSearchTextBlur() {
		this.setState({ searchTextValid: this.searchTextValidity() }, () => {
		});
		this.searchTextValidity();
	}

	searchTextValidity() {
		const valid = (this.state.searchText !== false) &&
			(this.state.searchText.replace(/\s/g, '').length !== 0);

		this.setState({ searchTextValid: valid });
		return valid;
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			searchText: '',
			searchTextValid: true,
			inputInProcess: true
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.setState( { inputInProcess: false });
		const formPayload = {
			searchText: this.state.searchText
		};
		if (!this.formValidity())
			return false;

		//console.log("In SearchBooks/handleFormSubmit. Submitting. state: ", this.state);
    this.props.searchForBooks(formPayload, () => {
			this.props.history.push(`/book_results/4`);
		});
	}

	formValidity() {
		return this.searchTextValidity();
	}

	render() {

		let displayAlert = false;

		if (this.props.bookResults == null &&
			!this.state.inputInProcess) {
			console.log("In SearchBooks/render. BookResults is null");
			displayAlert = true;
		}

		return (
			<Container>
        <Row className="justify-content-center">
				<Form onSubmit={this.handleFormSubmit}>
					<SingleInput
						inputType={'text'}
						title={'Search for Author or Title:'}
						name={'searchText'}
						changeFunc={this.handleSearchTextChange}
		        blurFunc={this.handleSearchTextBlur}
						focusFunc={this.handleSearchTextFocus}
						content={this.state.searchText}
						placeholder={''}
					 	valid={this.state.searchTextValid}
					 	feedBack = {'Oh noes! You must type a search text!'} />
						<FormGroup>
						<Button color="link"
							onClick={this.handleClearForm}>Clear form
						</Button>
						<Button color="Primary">
							Submit
						</Button>
				 	</FormGroup>
				</Form>
		</Row>
		<Row className="justify-content-center">
			{ displayAlert &&
				<Alert color="danger">
        	Error while searching for books. Please check your internet connection and try again.
      	</Alert>
			}
		</Row>
	</Container>
		);
	}
}

function mapStateToProps(state) {
  return {
    bookResults: state.bookResults
  };
}

export default connect(mapStateToProps,
	{ searchForBooks })(SearchBooks);
