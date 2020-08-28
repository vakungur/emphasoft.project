import { combineReducers } from 'redux';

import user from './userReducer';
import loading from './loadingReducer';
import users from './usersReducer'

const rootReducer = combineReducers({ user, loading, users });

export default rootReducer;