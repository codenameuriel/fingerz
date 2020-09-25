import * as actionTypes from './actionTypes';

export const generateWordMatrix = wordMatrix => {
  return {
    type: actionTypes.GENERATEWORDMATRIX,
    payload: {
      matrix: wordMatrix
    }
  };
};
