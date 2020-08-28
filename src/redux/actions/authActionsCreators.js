import { API, RESET_USER_INFO, SET_USER_INFO } from '../constanst';

export const loginUser = (data, onSuccess, onError) => (
  {
    type: API,
    payload: {
      method: 'POST',
      url: '/api-token-auth/',
      data,
      success: (response) => (setUserInfo(response, data)),
      postProcessSuccess: onSuccess,
      postProcessError: onError,
    },
  });

export const logoutUser = () => {
  localStorage.removeItem('USER_INFO');
  return { type: RESET_USER_INFO };
};


const setUserInfo = (response, { username }) => {
  const userInfo = {
    username,
    token: response.token,
    is_active: true,
  };
  localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
  return { type: SET_USER_INFO, payload: userInfo };
};