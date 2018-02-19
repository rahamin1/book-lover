import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback, Col } from 'reactstrap';

const SingleInput = (props) => (
	<FormGroup>
		<Col {...props.colWidth}>
		<Label for={props.name}>{props.title}</Label>
		<Input
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.changeFunc}
			onBlur={props.blurFunc}
			onFocus={props.focusFunc}
			placeholder={props.placeholder}
		 	valid={props.valid} />
			<FormFeedback>{props.feedBack}</FormFeedback>
		</Col>
	</FormGroup>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number', 'file', 'password', 'email']).isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	changeFunc: PropTypes.func.isRequired,
	blurFunc: PropTypes.func,
	focusFunc: PropTypes.func,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	placeholder: PropTypes.string,
	valid: PropTypes.bool,
	colWidth: PropTypes.object.isRequired
};

export default SingleInput;
