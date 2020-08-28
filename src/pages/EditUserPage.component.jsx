import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { createUser, getUserById, updateUserById } from '../redux/actions/usersActionsCreators';

const EditUserPage = ({
                        match, history, dispatchCreateUserAction,
                        dispatchUpdateUserAction,
                        dispatchGetUserByIdAction,
                      }) => {

  const [username, setUserName] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [is_active, setIsActive] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    first_name: false,
    last_name: false,
  });
  useEffect(() => {
    const { userId } = match.params;
    if (userId) {
      dispatchGetUserByIdAction(userId, ({ username, first_name, last_name, password, is_active }) => {
        setUserName(username);
        setFirstName(first_name);
        setLastName(last_name);
        setPassword(password);
        setIsActive(is_active);
      });
    }
  }, [dispatchGetUserByIdAction, match.params]);

  const handleOnSubmit = event => {
    event.preventDefault();

    if (isFormInvalid()) updateErrorsFlags();

    else {
      const { userId } = match.params;
      const data = { username, first_name, last_name, password, is_active };
      if (userId) {
        dispatchUpdateUserAction(userId, data, () => {
          toast.success('Пользователь успешно обновлен!');
          history.replace('/users');
        }, () => toast.error(`Ошибка: Данные не валидны`));
      } else {
        dispatchCreateUserAction(data, () => {
          toast.success('Пользователь успешно добавлен!');
          history.replace('/users');
        }, () => toast.error(`Ошибка: Данные не валидны`));
      }
    }
  };

  const isFormInvalid = () => {
    return (
      !username.trim() || !password || !first_name.trim() || !last_name.trim()
    );

  };

  const updateErrorsFlags = () => {
    const errObj = {
      username: false,
      password: false,
      first_name: false,
      last_name: false,
    };
    if (username.length <= 1 || username.length > 150 || username === '') {
      errObj.username = true;
      if (username.length <= 1) {
        errObj.usernameErrorMessage = 'Логин не может быть из 1 символа';
      }
      if (username.length > 150) {
        errObj.usernameErrorMessage = 'Логин не может быть более 150 символов';
      }
      if (username === '') {
        errObj.usernameErrorMessage = 'Укажите логин. В качестве символов можно использовать только буквы, цифры и @/./+/-/_';
      }
    }
    if (password === '' || typeof password === 'undefined') {
      errObj.password = true;
      errObj.passwordErrorMessage = 'Укажите пароль. Он должен содержать в себе не более 1 цифры и не более 1 заглавной буквы и быть не менее 8 символов';
    }
    if (!first_name) errObj.first_name = true;
    if (!last_name) errObj.last_name = true;
    setError(errObj);
  };


  return (
    <>
        <div className="uk-flex">
          <h2>Добавление пользователя</h2>
        </div>
      <div className="uk-flex uk-flex-wrap">
        <div className="uk-container uk-container-small uk-flex uk-flex-column">
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <input type="text"
                     placeholder="Логин"
                     name="username"
                     value={username}
                     onChange={(e) => setUserName(e.target.value)}
                     className={`uk-input ${error.username ? 'is-invalid' : ''}`}/>
              <p className="invalid-feedback">{error.usernameErrorMessage}</p>
            </div>
            <div className="form-group">
              <input type="text"
                     placeholder="Пароль"
                     name="password"
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className={`uk-input ${error.password ? 'is-invalid' : ''}`}/>
              <p className="invalid-feedback">{error.passwordErrorMessage}</p>
            </div>
            <div className="form-group">
              <input type="text"
                     placeholder="Имя"
                     name="first_name"
                     value={first_name}
                     onChange={(e) => setFirstName(e.target.value)}
                     className={`uk-input ${error.first_name ? 'is-invalid' : ''}`}/>
              <p className="invalid-feedback">Введите имя</p>
            </div>
            <div className="form-group">
              <input type="text"
                     placeholder="Фамилия"
                     name="last_name"
                     value={last_name}
                     onChange={(e) => setLastName(e.target.value)}
                     className={`uk-input ${error.last_name ? 'is-invalid' : ''}`}/>
              <p className="invalid-feedback">Введите фамилию</p>
            </div>
            <div className="uk-flex uk-flex-wrap uk-flex-between">
              <button className="uk-button uk-button-default">
                Сохранить
              </button>
              <button type="button"
                      onClick={() => history.replace('/users')}
                      className="uk-button uk-button-default">
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchCreateUserAction: (data, onSuccess, onError) =>
    dispatch(createUser(data, onSuccess, onError)),
  dispatchUpdateUserAction: (userId, data, onSuccess, onError) =>
    dispatch(updateUserById(userId, data, onSuccess, onError)),
  dispatchGetUserByIdAction: (userId, onSuccess) =>
    dispatch(getUserById(userId, onSuccess)),
});
export default connect(null, mapDispatchToProps)(EditUserPage);
