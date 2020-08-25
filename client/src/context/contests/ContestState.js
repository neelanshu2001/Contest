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
  EVENT_ERROR,
  SET_EVENT,
  REMOVE_EVENT,
  GET_USEREVENTS,
  ADD_CONTEST,
  DELETE_CONTEST,
  USER_ADDED_CONTEST
} from '../types';

const ContestState = (props) => {
  const initialState = {
    contest: null,
    loading: false,
    error: null,
    filtered: null,
    todayContest: null,
    userEvents: [],
    addedContests:[],
    userContests:[],
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
  //const set Event
  const setEvent = async (event) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/calendar', event, config);
      dispatch({ type: SET_EVENT, payload: res.data });
    } catch (err) {
      dispatch({ type: EVENT_ERROR, payload: err.response.msg });
    }
  };

  //delete event from calendar
  const removeEvent = async (event) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        event,
      },
    };
    try {
      await axios.delete(`/calendar/${event.id}`, config);
      dispatch({ type: REMOVE_EVENT, payload: event.id });
    } catch (err) {
      dispatch({ type: EVENT_ERROR, payload: err.response.msg });
    }
  };
  //get user events
  const getUserEvents = async () => {
    try {
      setLoading();
      const res = await axios.get('/calendar');
      dispatch({
        type: GET_USEREVENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg,
      });
    }
  };
   // Add contest
   const addContest = async(contest) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/addcontest', contest, config);
      dispatch({ type: ADD_CONTEST, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTEST_ERROR, payload: err.response });
    }
  };
  //get user added contests
  const getUseraddedcontests = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/addcontest/user');
      dispatch({
        type: USER_ADDED_CONTEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTEST_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //delete added contest
  const deleteAddedContest = async (contest) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        contest,
      },
    };
    try {
      await axios.delete(`/api/addcontest/${contest.id}`, config);
      dispatch({ type: DELETE_CONTEST, payload: contest.id });
    } catch (err) {
      dispatch({ type: CONTEST_ERROR, payload: err.response.msg });
    }
  };
  return (
    <contestContext.Provider
      value={{
        contest: state.contest,
        loading: state.loading,
        error: state.error,
        filtered: state.filtered,
        todayContest: state.todayContest,
        userEvents: state.userEvents,
        addedContests:state.addedContests,
        userContests:state.userContests,
        getDayContest,
        getContests,
        setLoading,
        clearErrors,
        filterContests,
        clearFilter,
        setEvent,
        removeEvent,
        getUserEvents,
        addContest,
        getUseraddedcontests,
        deleteAddedContest,
      }}
    >
      {props.children}
    </contestContext.Provider>
  );
};

export default ContestState;
