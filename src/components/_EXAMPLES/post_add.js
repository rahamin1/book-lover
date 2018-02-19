import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { addPost } from '../actions/index';

class PostAdd extends Component {

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title"
            component={this.renderField}
          />
          <Field label="Tags" name="tags"
            component={this.renderField}
          />
          <Field label="Content" name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <Link
            className="btn btn-danger" to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    let className =
    `form-group ${touched && error ? 'has-danger' : '' }`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help text-danger">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addPost(values, () => {
      this.props.history.push('/');
    });
  }
}

function validate(values) {
  const errors = {};

  // validate the input from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  } else if ((values.title.replace(/\s/g, '').length === 0)) {
    errors.title = "Title must not be empty!";
  }

  if (!values.tags) {
    errors.tags = "Enter tags!";
  } else if ((values.tags.replace(/\s/g, '').length === 0)) {
    errors.tags = "Tags must not be empty!";
  }

  if (!values.content) {
    errors.content = "Enter a content!";
  } else if ((values.content.replace(/\s/g, '').length === 0)) {
    errors.content = "Content must not be empty!";
  }

  // if errors is empty, the form is fine to Submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { addPost }, dispatch );
}

export default reduxForm({
  validate,
  form: 'PostAddForm'
})(
  connect(null, mapDispatchToProps)(PostAdd)
);


/*
Your last line has some parentheses issues.

export default connect(null, { createPost })(reduxForm(formData)(PostsNew));
It's a lot cleaner if you do it in several steps.

PostsNew = reduxForm(formData)(PostsNew)

PostsNew = connect(null, { createPost })(PostsNew)

export default PostsNew
*/
