import {
  CLEAR_ERRORS,
  CONTEST_ERROR,
  SET_LOADING,
  GET_CONTESTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTESTS:
      return {
        ...state,
        contest: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CONTEST_ERROR:
      return {
        ...state,

        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
