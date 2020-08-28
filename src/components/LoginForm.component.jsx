import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';


import { loginUser } from '../redux/actions/authActionsCreators';

const LoginForm = ({ dispatchLoginAction }) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ login: false, password: false });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (isFormInvalid()) updateErrorsFlags();

    dispatchLoginAction(login, password,
      () => toast.success('Авторизация выполнена!'),
      () => toast.error(`Ошибка: Неверное имя или пароль`));
  };

  const isFormInvalid = () => (!login || !password);

  const updateErrorsFlags = () => {
    const errObj = { login: false, password: false };
    if (!login.trim()) errObj.login = true;
    if (!password.trim()) errObj.password = true;
    setError(errObj);
  };

  return (
      <form onSubmit={handleOnSubmit}>
        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon" data-uk-icon="icon: user"/>
            <input id="login"
                   type="text"
                   name="login"
                   placeholder="Введите логин"
                   value={login}
                   autoComplete="off"
                   onChange={(e) => setLogin(e.target.value)}
                   className={`uk-input ${error.login ? 'uk-form-danger' : ''}`}/>
          </div>
        </div>
        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon" data-uk-icon="icon: lock"/>
            <input id="password"
                   type="password"
                   name="password"
                   placeholder="Введите пароль"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className={`uk-input ${error.password ? 'uk-form-danger' : ''}`}/>
          </div>
        </div>
        <div className="uk-flex uk-flex-center">
          <button type="submit" className="uk-button uk-button-default">
            Войти | <span className="uk-margin-small-left uk-icon-link" data-uk-icon="sign-in"/>
          </button>
        </div>
      </form>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchLoginAction: (username, password, onSuccess, onError) =>
    dispatch(loginUser({ username, password }, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(LoginForm);
