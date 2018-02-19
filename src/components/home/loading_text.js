import React from 'react';
import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const LoadingText = () => {
  return (
      <Alert color="info"
        className="h-100 text-center">
        <br /><br /><br /><br />
        <h6 className="text-center">
          Initializing. Please wait...
        </h6>
      </Alert>
  );
};

export default LoadingText;
