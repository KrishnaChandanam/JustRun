import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    User: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          User: payload
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case ACCOUNT_DELETED:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          User: null
        };
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          User: null
        };
      default:
        return state;
    }
  }