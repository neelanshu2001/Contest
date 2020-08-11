import React, { useReducer } from 'react';
import axios from 'axios';
import contestContext from './contestContext';
import contestReducer from './contestReducer';
import {
  CONTEST_ERROR,
  GET_CONTESTS,
  CLEAR_ERRORS,
  SET_LOADING,
} from '../types';

const ContestState = (props) => {
  const initialState = {
    contest: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(contestReducer, initialState);
  //set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //get contests
  const getContests = async () => {
    try {
      setLoading();
      const res = await axios.get('/contests');
      dispatch({ type: GET_CONTESTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTEST_ERROR, payload: err.response });
    }
  };
  //clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <contestContext.Provider
      value={{
        contest: state.contest,
        loading: state.loading,
        error: state.error,
        getContests,
        setLoading,
        clearErrors,
      }}
    >
      {props.children}
    </contestContext.Provider>
  );
};

export default ContestState;
