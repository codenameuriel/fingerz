// wordPanel action creators

import * as actionTypes from './actionTypes';

const handleKeyPress = () => {
  return {
    type: actionTypes.HANDLE_KEY_PRESS
  };
};

const updateStateOnChange = event => {
  return {
    type: actionTypes.HANDLE_CHANGE,
    payload: {
      input: event.target.value,
      typedKey: event.target.value[event.target.value.length - 1]
    }
  };
};

export const handleChange = event => {
  return dispatch => {
    dispatch(updateStateOnChange(event));
    dispatch(handleKeyPress());
  }
};
