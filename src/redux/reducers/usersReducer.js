import { ADD_USER, REMOVE_USER, RESET_USER_INFO, SET_ALL_USERS, UPDATE_USER } from '../constanst';

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.payload;
    case ADD_USER:
      return state.concat(action.payload);
    case REMOVE_USER:
      return state.filter(user => user.id !== action.payload);
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === action.payload.userId)
          return { ...user, ...action.payload.data };
        else
          return user;
      });
    case RESET_USER_INFO:
      return [];
    default:
      return state;
  }
}