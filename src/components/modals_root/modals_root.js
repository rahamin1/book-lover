import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginModal from '../auth/login_modal';
import SignupModal from '../auth/signup_modal';

export const LOGIN_MODAL = 'LOGIN_MODAL';
export const SIGNUP_MODAL = 'SIGNUP_MODAL';

const modalsList = {
  LOGIN_MODAL: LoginModal,
  SIGNUP_MODAL: SignupModal
};

class ModalsRoot extends Component {

  render() {
    const modals = this.props.modals;
    if (!modals.modalType) { // null means no modal
      return (
        null
      );
    } else {
      const DisplayedModal = modalsList[modals.modalType];
      const modalProps = modals.modalProps;
      return (
        <DisplayedModal {...modalProps} />
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    modals: state.modals
  };
}

export default connect(mapStateToProps)(ModalsRoot);
