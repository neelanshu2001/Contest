import {
  CLEAR_ERRORS,
  CONTEST_ERROR,
  SET_LOADING,
  GET_CONTESTS,
  GET_TODAYCONTESTS,
  FILTER_CONTESTS,
  CLEAR_FILTER,
  SET_EVENT,
  EVENT_ERROR,
  REMOVE_EVENT,
  GET_USEREVENTS,
  ADD_CONTEST,
  USER_ADDED_CONTEST,
  DELETE_CONTEST,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USEREVENTS:
      return {
        ...state,
        userEvents: action.payload,
        loading: false,
      };
    case SET_EVENT:
      return {
        ...state,
        userEvents: [...state.userEvents, action.payload],
      };
    case REMOVE_EVENT:
      return {
        ...state,
        userEvents: state.userEvents.filter(
          (event) => event._id !== action.payload
        ),
        loading: false,
      };
    case GET_TODAYCONTESTS:
      return {
        ...state,
        todayContest: action.payload.filter(
          (contest) =>
            contest.date.slice(0, -8) ===
            new Date(new Date().toUTCString().slice(0, -4) + '-0530')
              .toUTCString()
              .slice(0, -12)
        ),

        loading: false,
      };
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
    case FILTER_CONTESTS:
      return {
        ...state,
        filtered: state.contest.filter((contestItem) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            contestItem.title.match(regex) ||
            contestItem.date.match(regex) ||
            contestItem.platform.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case EVENT_ERROR:
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
    case ADD_CONTEST:
      return{
        ...state,
        addedContests: [...state.addedContests, action.payload]
      }
    case USER_ADDED_CONTEST:
      return {
        ...state,
        userContests: action.payload,
        loading: false,
      }; 
    case DELETE_CONTEST:
      return{
        ...state,
        userContests: state.userContests.filter(
          (contest) => contest._id !== action.payload
        ),
        loading: false, 
      };
    default:
      return {
        ...state,
      };
  }
};
