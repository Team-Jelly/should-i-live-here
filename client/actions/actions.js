/* eslint-disable no-irregular-whitespace */
/*
 * Action creators
 */
import * as types from '../constants/actionTypes';

/* SEARCH API */

/* Redux thunk responsible for inputting an address and making
a request to the NYC Open Data 311 Complaints API */

export const addressSearch = (address, borough, userId) => (dispatch) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      borough,
      userId,
    }),
  };
  console.log('addressSearch');
  fetch('/api', config)
    .then((response) => response.json())
    .then((data) => dispatch({
      type: types.SEARCH_ADDRESS,
      payload: {
        address_search: `${address} ${borough}`,
        current_results: data,
      },
    }))
    .catch((err) => console.log(err));
};

export const getSearchHistory = (userId) => (dispatch) => {
  fetch(`/user/history/${userId}`)
    .then((response) => response.json())
    .then((data) => dispatch({
      type: types.HISTORY,
      payload: data,
    }))
    .catch((err) => console.log(err));
};

/* AUTHENTICATION */

/* Redux thunk to compare server data with user input from login form */
export function userLoginFetch(email, password) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, // need to check form is coming in this format
    body: JSON.stringify({
      email,
      password,
    }),
  };

  // Redux thunk to dispatch requestLogin to make an async call to our API
  return (dispatch) =>
  // config is passed as our option options object to be sure only certain requests will resolve
    fetch('/user/login', config)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: types.SIGN_IN,
          payload: data,
        });
      });
}

export function userCreateFetch(name, email, password) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, // need to check form is coming in this format
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };

  /*
    Redux thunk to dispatch userCreateFetch to make an async call to our API to create
    a new user in our database
  */
  return (dispatch) => fetch('/user/register', config)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: types.REGISTER,
        payload: data,
      });
    });
}
/* Redux thunk is required to log users out */
export function userLogout() {
  console.log('userLogout');
  return ({
    type: types.LOGOUT,
    payload: [],
  });
}
