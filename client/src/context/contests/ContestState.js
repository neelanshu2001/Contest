import React, { useReducer } from 'react';
import axios from 'axios';
import contestContext from './contestContext';
import contestReducer from './contestReducer';
import {
  CONTEST_ERROR,
  GET_CONTESTS,
  CLEAR_ERRORS,
  SET_LOADING,
  GET_TODAYCONTESTS,
  FILTER_CONTESTS,
  CLEAR_FILTER,
} from '../types';

const ContestState = (props) => {
  const initialState = {
    contest: null,
    loading: false,
    error: null,
    filtered: null,
    todayContest: null,
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
  //get contests of the day
  const getDayContest = async () => {
    try {
      setLoading();
      const res = await axios.get('/contests');
      dispatch({ type: GET_TODAYCONTESTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTEST_ERROR, payload: err.response });
    }
  };
  //FILTER CONTESTS
  const filterContests = (text) => {
    dispatch({ type: FILTER_CONTESTS, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <contestContext.Provider
      value={{
        contest: state.contest,
        loading: state.loading,
        error: state.error,
        filtered: state.filtered,
        todayContest: state.todayContest,
        getDayContest,
        getContests,
        setLoading,
        clearErrors,
        filterContests,
        clearFilter,
      }}
    >
      {props.children}
    </contestContext.Provider>
  );
};

export default ContestState;
