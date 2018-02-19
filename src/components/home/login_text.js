import React from 'react';
import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const loginText1 = "Sign up for your free account!";
const loginText2 = "If you have an account, login.";

const LoginText = () => {
  return (
    <div align="center" style={{ display: "inline-block", width: "100%" }}>
      <Alert color="info" align="center" style={{ color: "gray" }}>
        <h6><br />{loginText1}</h6>
        <br />
        <h6>{loginText2}<br /><br /></h6>
      </Alert>
    </div>
  );
};

export default LoginText;
