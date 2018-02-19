import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Button,
	Container, Row, Alert } from 'reactstrap';
import SingleInput from '../form/single_input';
import { searchForBooks } from '../../actions/actions_books_search';

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

	render() {

		let displayAlert = false;
		const colWidth = { xl: "12", md: "12", sm: "12", xs: "12" };

		if (this.props.bookResults.error &&
			!this.state.inputInProcess) {
			console.log("In SearchBooks/render. Search returned error");
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
						 	feedBack = {'Oh noes! You must type a search text!'}
						 	colWidth = {colWidth} />

						<FormGroup>
							<Button color="link"
								onClick={this.handleClearForm}>Clear form
							</Button>
							<Button color="Primary" type="submit">
								Submit
							</Button>
					 	</FormGroup>

				</Form>
			</Row>
			<Row className="justify-content-center">
				{ this.props.bookResults.isFetching && !displayAlert &&
					<Alert color="info">
	        	Searching for books...
	      	</Alert>
				}
				{ displayAlert &&
					<Alert color="danger">
	        	Error while searching for books.
						Please check your internet connection and try again.
	      	</Alert>
				}
			</Row>
		</Container>
		);
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

		const catId = this.props.match.params.catId;
		this.setState( { inputInProcess: false });
		const formPayload = {
			searchText: this.state.searchText
		};
		if (!this.formValidity())
			return false;

    this.props.searchForBooks(formPayload, () => {
			this.props.history.push(`/book_results/${catId}`);
		});
	}

	formValidity() {
		return this.searchTextValidity();
	}

}

function mapStateToProps(state) {
  return {
    bookResults: state.bookResults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchForBooks: searchForBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBooks);
