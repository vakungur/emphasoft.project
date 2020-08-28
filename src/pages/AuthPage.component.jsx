import React from 'react';

import LoginForm from '../components/LoginForm.component';
import backgroundAuth from '../assets/img/backgroundAuth.jpg'

const LoginBackground = {
  backgroundImage: `url(${backgroundAuth})`,
};
const AuthPage = () => (
  <div className="uk-background-secondary uk-flex uk-height-viewport uk-light uk-background-cover"
       data-uk-height-viewport="true"
       style={LoginBackground}>
    <div className="uk-margin-auto uk-margin-auto-vertical">
      <LoginForm/>
    </div>
  </div>
);

export default AuthPage;
