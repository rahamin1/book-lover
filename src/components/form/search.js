import React, { Component } from 'react';
import { Form, FormGroup, Button,
	Container, Col, Alert } from 'reactstrap';
import SingleInput from './single_input';
import Select from './select';
import TextArea from './text_area';
import CheckboxOrRadioGroup from './checkbox_or_radio_group';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {

// text1Input = SingleInput Component
// Search for "text1" in this file for all SingleInput handling
			text1Input: '',
			text1InputValid: true,
			text1InputError: "",

// text1Input Selection = Select Component
// Search for "text1Input" in this file for all Select handling
			text1InputOptions: [ "Art", "Classic", "Fiction", "Biography"],
			text1InputSelection: "",

// description = TextArea Component
// Search for "description" in this file for all TextArea handling
			description: '',

// checkbox = CheckboxOrRadioGroup
// (type checkbox) Component
// Search for "checkbox" in this file for all checkbox handling
			checkBoxSelections: ['Box1', 'Box2', 'Box3', 'Box4',
					'Box5', 'Box6', 'Box7', 'Box8'],
			selectedCheckBoxes: ['Box2', 'Box4'],

// radiogroup = CheckboxOrRadioGroup
// (type radiogroup) Component
// Search for "radiogroup" in this file for all radiogroup handling
			radioGroupOptions: ['Yes', 'No'],
			radioGroupSelection: ['Yes'],

			inputInProcess: true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.handleText1InputFocus = this.handleText1InputFocus.bind(this);
		this.handleText1InputChange = this.handleText1InputChange.bind(this);
    this.handleText1InputBlur = this.handleText1InputBlur.bind(this);
		this.text1InputValidity = this.text1InputValidity.bind(this);

		this.handleCategorySelect = this.handleCategorySelect.bind(this);

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

		this.handleCheckBoxSelection = this.handleCheckBoxSelection.bind(this);
		this.handleRadioGroupSelection = this.handleRadioGroupSelection.bind(this);

	}

	// text1Input functions

	handleText1InputFocus() {

		//console.log('onFocus Text1Input / e.target.value:', e.target.value);
		this.setState( { text1InputValid: true,
		 		inputInProcess: true, text1InputError: "" });
	}

	handleText1InputChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ text1Input: e.target.value }, () => {
		});
	}

	handleText1InputBlur() {
		this.setState({ text1InputValid: this.text1InputValidity() }, () => {
		});
		this.text1InputValidity();
	}

	text1InputValidity() {

		const text1Input = this.state.text1Input;
    let valid;
    let error;

		// Check the value and if there is an error,
		// set the error string accordingly
		// The following example tests the following:
		// (1) If value is not typed, error = "Text input is required"
		// (2) If the value contains a number,
		//			error = "Digits are not permitted"
		if ((text1Input === false) ||
			(text1Input.replace(/\s/g, '').length === 0)) {
        valid = false;
        error = "Text input is required!";
      } else if (/\d/.test(text1Input)) {
        valid = false;
        error = "Digits are not permitted!";
      } else {
        valid = true;
        error = "";
      }

      this.setState({ text1InputValid: valid,
          text1InputError: error });

			return valid;
	}

	handleCategorySelect(e) {
		this.setState({ text1InputSelection: e.target.value });

			//() => console.log('text1Input', //this.state.text1InputSelection));
	}

	handleDescriptionChange(e) {

		// const textArray = e.target.value.split('').filter(x => x !== 'e');
		// console.log('string split into array of letters',textArray);
		// const filteredText = textArray.join('');
		// this.setState({ description: filteredText }, () => console.log('description', this.state.description));
		this.setState({ description: e.target.value });

			// () => console.log('description', this.state.description));
	}

	handleCheckBoxSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if (this.state.selectedCheckBoxes.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedCheckBoxes.filter(s => s !== newSelection);
		} else {
			newSelectionArray = [...this.state.selectedCheckBoxes, newSelection];
		}
		this.setState({ selectedCheckBoxes: newSelectionArray });

			//() => console.log('checkbox selection: ', //this.state.selectedCheckBoxes));
	}
	handleRadioGroupSelection(e) {
		this.setState({ radioGroupSelection: [e.target.value] });

			//() => console.log('radio group: ', //this.state.radioGroupSelection));
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			text1Input: '',
			text1InputValid: true,
			text1InputError: "",
			text1InputSelection: '',
			description: '',
			selectedCheckBoxes: [],
			radioGroupSelection: [],
			inputInProcess: true
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.setState(() => {
			return { inputInProcess: false };
		});

		const formPayload = {
			text1Input: this.state.text1Input,
			text1InputSelection: this.state.text1InputSelection,
			description: this.state.description,
			selectedCheckBoxes: this.state.selectedCheckBoxes,
			radioGroupSelection: this.state.radioGroupSelection
		};
		if (!this.formValidity())
			return false;

		console.log("In Search/handleFormSubmit. Submitting now. formPayload: ", formPayload);
	}

	formValidity() {
		return (this.state.text1InputSelection !== "" &&
			this.text1InputValidity());
	}

	render() {

		let displayAlert = false;
		const colWidth = { xl: "6", md: "8", sm: "10", xs: "12" };

		return (
			<Container>
				<Form onSubmit={this.handleFormSubmit}>
					<SingleInput
						inputType={'text'}
						title={'Title for SingleInput field:'}
						name={'text1Input'}
						changeFunc={this.handleText1InputChange}
		        blurFunc={this.handleText1InputBlur}
						focusFunc={this.handleText1InputFocus}
						content={this.state.text1Input}
						placeholder={''}
					 	valid={this.state.text1InputValid}
					 	feedBack = {this.state.text1InputError}
						colWidth = {colWidth} />

					<Select
						name={'text1Input'}
						placeholder={'Choose text1Input'}
						required={true}
						controlFunc={this.handleCategorySelect}
						options={this.state.text1InputOptions}
						selectedOption={this.state.text1InputSelection}
						colWidth = {colWidth} />

					<TextArea
						title={'Title for TextArea field:'}
						rows={5}
						resize={true}
						content={this.state.description}
						name={'currentPetInfo'}
						controlFunc={this.handleDescriptionChange}
						placeholder={'Write description here...'}
						colWidth = {colWidth} />

					<CheckboxOrRadioGroup
						title={'Checkbox example'}
						setName={'checkbox'}
						type={'checkbox'}
						controlFunc={this.handleCheckBoxSelection}
						options={this.state.checkBoxSelections}
						selectedOptions={this.state.selectedCheckBoxes}
					 	inline={true}
						colWidth = {colWidth} />

					<CheckboxOrRadioGroup
						title={'RadioGroup example'}
						setName={'radiogroup'}
						controlFunc={this.handleRadioGroupSelection}
						type={'radio'}
						options={this.state.radioGroupOptions}
						selectedOptions={this.state.radioGroupSelection}
					 	inline={false}
						colWidth = {colWidth} />

					<FormGroup>
						<Col {...colWidth}>
							<Button color="link"
								onClick={this.handleClearForm}>Clear form
							</Button>
							<Button type="submit" color="primary">
								Submit
							</Button>
						</Col>
			 		</FormGroup>
				</Form>

				<FormGroup>
					<Col {...colWidth}>
						{ displayAlert &&
							<Alert color="danger">
			        	Error while searching for books.<span> </span>
								Please check your internet connection and try again.
			      	</Alert>
						}
					</Col>
				</FormGroup>

			</Container>
		);
	}
}
