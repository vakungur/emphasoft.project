import axios from 'axios';

import { API, TOGGLE_LOADER } from './constanst';
import { logoutUser } from './actions/authActionsCreators';

export const apiMiddleware = ({ dispatch, getState }) => next => action => {

  if (action.type !== API) return next(action);

  dispatch({ type: TOGGLE_LOADER });
  const BASE_URL = 'https://emphasoft-test-assignment.herokuapp.com';

  const AUTH_TOKEN = getState().user.token;

  if (AUTH_TOKEN){
    axios.defaults.headers.common['Authorization'] = `Token ${AUTH_TOKEN}`;
  }

  const { url, method, success, data, postProcessSuccess, postProcessError } = action.payload;

  axios({
    method,
    url: BASE_URL + url,
    data: data ? data : null,
  }).then((response) => {
    dispatch({ type: TOGGLE_LOADER });
    if (success) dispatch(success(response.data));
    if (postProcessSuccess) postProcessSuccess(response.data);
  }).catch(err => {
    dispatch({ type: TOGGLE_LOADER });
    if (err.response)
      if (err.response && err.response.status === 403)
        dispatch(logoutUser());
    else {
        if (postProcessError) postProcessError(err);
    }
  });
};
