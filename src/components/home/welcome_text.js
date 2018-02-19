import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const WelcomeText = (props) => {
  return (
      <Alert color="info"
        className="h-100 text-center">
        <br /><br /><br />
        <h6 className="text-center">
          Welcome {cutOutDomain(props.loginEmail)}!
          <br /><br />
          View your library or continue building it. Enjoy!
        </h6>
      </Alert>
  );
};

function cutOutDomain(mail) {
  const index = mail.indexOf('@');
  return mail.substring(0, index !== -1 ? index : mail.length);
}

WelcomeText.propTypes = {
	loginEmail: PropTypes.string.isRequired
};

export default WelcomeText;
