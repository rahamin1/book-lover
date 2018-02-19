import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Form, FormGroup, Button, Alert } from 'reactstrap';
import SingleInput from '../form/single_input';
import { addCat, fetchCats } from '../../actions/actions_cats';
import Cat from './cat';

const categoryIsDuplicate = "This category exists. " +
  "Select another name.";
const categoryIsRequired = "You should type a category name!";

class Cats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: '',
      catImage: '',
      catImageBase64: '',
      categoryValid: true,
      categoryError: "",
      addCatInProcess: false
    };

    this.handleCategoryFocus = this.handleCategoryFocus.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCategoryBlur = this.handleCategoryBlur.bind(this);
		this.categoryValidity = this.categoryValidity.bind(this);

		this.handleCatImageChange = this.handleCatImageChange.bind(this);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {

    const loginEmail = this.props.loginEmail;
    if (!loginEmail || loginEmail === "") {

      // console.warn("In Cats/componentDidMount. loginEmail value seems to be wrong: ", loginEmail);
    } else {
      this.props.fetchCats(this.props.loginEmail);
    }
  }

  render() {

    const catsObj = this.props.cats.data;
    let catsArray = [];
    for (var key in catsObj) {
      catsArray.push({ id: key, ...catsObj[key] });
    }
    const cats = catsArray.map( (cat) => {
      return (
        <Cat cat={cat} key={cat.id} />
      );
    });

    return (
      <Container>
        {this.renderMessage()}
        <Row className="justify-content-center">
          {cats}
        </Row>
        {this.renderButtons()}
      </Container>
    );
  }

  renderMessage() {
    const fetchingCatsInProcess = this.props.cats.fetchingCatsInProcess;
    const fetchingCatsError = this.props.cats.fetchingCatsError;
    if (fetchingCatsInProcess) {
      const msg =
        (this.props.cats.data && this.props.cats.data !== {}) ?
        "Refreshing list of categories..." :
        "Retrieving list of categories...";

      return (
        <Row className="justify-content-center">
          <Alert color="info">
            {msg}
          </Alert>
        </Row>
      );
    } else if (!fetchingCatsInProcess && fetchingCatsError) {
      const errorMsg =
        (this.props.cats.data && this.props.cats.data !== {}) ?
        "Failed to refresh the list of categories." :
        "Failed to retrieve the list of categories.";
      return (
        <Row className="justify-content-center">
          <Alert color="danger">
            {errorMsg}
            <br />Check you internet connection and try to refresh the page.
          </Alert>
        </Row>
      );
    } else if (!this.props.cats.data || this.props.cats.data === {}) {
      return (
        <Row className="justify-content-center">
          <Alert color="info" align="center" >
            You don't have any defined book categories.
            <br />Please add at least one category to start building your library.
          </Alert>
        </Row>
      );
    }
  }

  renderButtons() {
    const colWidth = { xl: "12", md: "12", sm: "12", xs: "12" };

    return (
      <div>
        <br />
        <Row className="justify-content-center">
          <Form onSubmit={this.handleFormSubmit}>

            <h6>Add new category:</h6>
            <SingleInput
  						inputType={'text'}
  						name={'catName'}
  						changeFunc={this.handleCategoryChange}
  		        blurFunc={this.handleCategoryBlur}
  						focusFunc={this.handleCategoryFocus}
  						content={this.state.category}
  						placeholder={''}
  					 	valid={this.state.categoryValid}
  					 	feedBack = {this.state.categoryError}
              title="Category name:"
  						colWidth = {colWidth} />

            <FormGroup>
              <SingleInput
    						inputType={'file'}
    						name={'catImage'}
    						changeFunc={this.handleCatImageChange}
    						content={this.state.catImage}
                title="Category image:"
    						colWidth = {colWidth} />
            </FormGroup>

            <FormGroup>
              <Button color="primary"
                onClick={this.handleFormSubmit}
                style={{ color: "white" }}>
                  Add Category
              </Button>
            </FormGroup>
          </Form>
        </Row>
        <br />
        <Row className="justify-content-center">
  				{ !this.state.inputInProcess &&
            !this.props.cats.catAddInProcess &&
            this.props.cats.catAddError &&
            this.renderError(this.props.cats.catAddError) }
  			</Row>
      </div>
    );
  }

  renderError(error) {
    return (
      <Row className="justify-content-center">
        <Alert color="danger">
          Failed to add category: {error}
        </Alert>
      </Row>
    );
  }

  renderDuplicate() {
    return (
      <Row className="justify-content-center">
        <Alert color="danger">
          You typed the name of an existing category. Choose another category name.
        </Alert>
      </Row>
    );
  }

  handleFormSubmit(e) {
		e.preventDefault();

		this.setState(() => {
			return { inputInProcess: false };
		});

		const formPayload = {
			category: this.state.category,
      catImageBase64: this.state.catImageBase64
		};
		if (!this.formValidity())
			return false;
    this.handleClearForm(e);
    this.props.addCat(formPayload, this.props.loginEmail);
	}

	formValidity() {
		return (this.categoryValidity());
	}

  handleClearForm(e) {
		e.preventDefault();
		this.setState({
      category: '',
      catImage: '',
      catImageBase64: '',
      categoryValid: true,
      categoryError: "",
      inputInProcess: false
		});
	}

  // category functions

	handleCategoryFocus() {

		this.setState( { categoryValid: true,
		 		categoryError: "",
        inputInProcess: true });
	}

	handleCategoryChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ category: e.target.value }, () => {
		});
	}

	handleCategoryBlur() {

		//this.setState({ categoryValid: this.categoryValidity() }, () => {
		//});
		this.categoryValidity();
	}

	categoryValidity() {

    const category = this.state.category;
    const cats = this.props.cats;
    let valid;
    let error;

		if ((category === false) ||
			(category.replace(/\s/g, '').length === 0)) {
        valid = false;
        error = categoryIsRequired;
      } else if (cats && cats.data &&
        cats.data.hasOwnProperty(category)) {
        valid = false;
        error = categoryIsDuplicate;
      } else {
        valid = true;
        error = "";
      }

      this.setState({ categoryValid: valid,
          categoryError: error });
      return valid;
	}

  // catImage function

	handleCatImageChange(e) {
    this.setState({
      catImage: e.target.value
    });
    if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            catImageBase64: e.target.result
          });
        };
        reader.readAsDataURL(e.target.files[0]);
    }
	}
}

function mapStateToProps(state) {
  return {
    cats: state.cats,
    loginEmail: state.auth.loginEmail
  };
}

export default connect(mapStateToProps,
  { addCat, fetchCats })(Cats);
