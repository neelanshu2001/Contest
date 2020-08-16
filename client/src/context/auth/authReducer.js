import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_TOKEN,
  NO_TOKEN,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('gtoken', action.payload);
      return {
        ...state,
        gtoken: action.payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case NO_TOKEN:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('gtoken');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        token: null,
        error: action.payload,
        gtoken: null,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('gtoken');
      return {
        ...state,
        token: null,
        gtoken: null,
        isAuthenticated: false,
        user: null,
        loading: false,

        error: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      localStorage.removeItem('gtoken');
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: true,
      };

    default:
      return state;
  }
};
