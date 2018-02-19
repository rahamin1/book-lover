import * as actions from '../actions/action_types';

const initialState = {
  modalType: null,
  modalProps: {}
};

export default function modalsReducer(state = initialState, action) {

  switch (action.type) {

    case actions.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };

    case actions.HIDE_MODAL:
        return initialState;

    default:
      return state;
  }
}
