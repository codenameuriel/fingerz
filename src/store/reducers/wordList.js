import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wordRowIndex: 0,
  matrix: []
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GENERATEWORDMATRIX: 
      return {
        ...state,
        matrix: action.payload.matrix
      }
  }
};