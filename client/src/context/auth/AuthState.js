import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_TOKEN,
  NO_TOKEN,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    gtoken: localStorage.getItem('gtoken'),
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  //loadUser
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  //Remove all errors from login
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //user login
  const login = async (formdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formdata, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };
  //add user
  const register = async (formdata) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formdata, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //setToken
  const setgtoken = async (code) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/gauth', code, config);
      dispatch({ type: SET_TOKEN, payload: res.data });
    } catch (err) {
      dispatch({ type: NO_TOKEN, payload: err });
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        gtoken: state.gtoken,
        redirect: state.redirect,
        login,
        clearErrors,
        loadUser,
        logout,
        register,
        setgtoken,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
