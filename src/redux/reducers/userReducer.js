import { RESET_USER_INFO, SET_USER_INFO } from '../constanst';

const defaultState = {
  id: null,
  username: null,
  token: null,
  is_active: false,
};

const userInfo = localStorage.getItem('USER_INFO');
const INITIAL_STATE = userInfo ? JSON.parse(userInfo) : defaultState;

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...action.payload };
    case RESET_USER_INFO:
      return { ...defaultState };
    default:
      return state;
  }
}