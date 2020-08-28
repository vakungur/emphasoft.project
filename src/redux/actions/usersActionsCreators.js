import { ADD_USER, API, REMOVE_USER, SET_ALL_USERS, UPDATE_USER } from '../constanst';

export const fetchAllUsers = () => ({
    type: API,
    payload: {
      method: 'GET',
      url: '/api/v1/users/',
      success: (response) => (setAllUsers(response)),
    },
  }
);

export const createUser = (data, onSuccess, onError) => ({
  type: API,
  payload: {
    method: 'POST',
    url: '/api/v1/users/',
    data,
    success: (user) => (addUser(user)),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const getUserById = (userId, onSuccess) => ({
  type: API,
  payload: {
    method: 'GET',
    url: `/api/v1/users/${userId}/`,
    postProcessSuccess: onSuccess,
  },
});

export const updateUserById = (userId, data, onSuccess, onError) => ({
  type: API,
  payload: {
    method: 'PUT',
    url: `/api/v1/users/${userId}/`,
    data,
    success: (userId, data) => (updateUser(userId, data)),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const deleteUserById = (userId, onSuccess, onError) => ({
  type: API,
  payload: {
    method: 'DELETE',
    url: `/api/v1/users/${userId}/`,
    success: () => (removeUser(userId)),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

const setAllUsers = (data) => {
  return ({
    type: SET_ALL_USERS,
    payload: data,
  });
};

const updateUser = (userId, data) => ({
  type: UPDATE_USER,
  payload: { userId, data },
});

const removeUser = (userId) => ({
  type: REMOVE_USER,
  payload: userId,
});