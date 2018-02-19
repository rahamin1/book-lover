import * as actions from './action_types';

export function showModal(modalType, modalProps) {
  return {
    type: actions.SHOW_MODAL,
    modalType: modalType,
    modalProps: modalProps
  };
}

export function hideModal() {
  return {
    type: actions.HIDE_MODAL
  };
}
