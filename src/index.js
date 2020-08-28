import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '@fortawesome/fontawesome-free/js/all';

import * as serviceWorker from './serviceWorker'
import './includes/bootstrap';
import './index.scss';
import App from './App';
import configureStore from './redux/configureStore';

const store = configureStore();

UIkit.use(Icons);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/emphasoft.project">
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
