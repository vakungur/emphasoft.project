import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteUserById } from '../redux/actions/usersActionsCreators';

const UsersCollection = ({ users, dispatchDeleteAction }) => {

  const [selectedUser, setSelectedUser] = useState('');

  const showConfirmationModal = (event, userId) => {
    event.preventDefault();
    setSelectedUser(userId);
    window.$('#confirmationModal').modal('show');
  };

  const handleOnDelete = () => {
    dispatchDeleteAction(selectedUser, () => {
      window.$('#confirmationModal').modal('hide');
      toast.success('Пользователь удален!');
    }, (message) => {
      window.$('#confirmationModal').modal('hide');
      toast.error(`Ошибка: ${message}`);
    });
  };

  return (
    <div className="uk-section">
      <div className="uk-container uk-overflow-auto">
        <table className="uk-table uk-table-responsive uk-table-small uk-table-divider uk-table-middle uk-table-justify uk-light">
          <thead>
          <tr>
            <th className="uk-table-shrink">ID</th>
            <th className="uk-table-shrink">Логин</th>
            <th className="uk-table-shrink">Имя пользователя</th>
            <th className="uk-table-shrink">Фамилия пользователя</th>
            <th className="uk-table-shrink"/>
          </tr>
          </thead>
          <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/edit-user/${user.id}`}>
                    {user.id}
                  </Link>
                </td>
                <td>
                  <Link to={`/edit-user/${user.id}`}>
                  {user.username}
                  </Link>
                </td>
                <td>{user.first_name.length === 0 ? 'Имя пользователя не задано' : user.first_name}</td>
                <td>{user.last_name.length === 0 ? 'Фамилия пользователя не задана' : user.last_name}</td>
                <td>
                  <a href="/" onClick={(e) => showConfirmationModal(e, user.id)}>
                    <span className="uk-margin-small-left uk-icon-link" data-uk-icon="icon: trash; ratio: 1.5"/>
                  </a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

      <Modal handleOnDelete={handleOnDelete}/>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchDeleteAction: (userId, onSuccess, onError) =>
    dispatch(deleteUserById(userId, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(UsersCollection);

const Modal = ({ handleOnDelete }) => (
  <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
    <div role="document" className="modal-dialog">
      <div className="modal-content uk-background-secondary uk-align-center">
        <div className="modal-header">
          <h5 className="modal-title">Предупреждение</h5>
        </div>
        <div className="modal-body">
          <p>Вы уверены, что хотите удалить пользователя ?</p>
        </div>
        <div className="modal-footer">
          <button type="button" data-dismiss="modal" className="uk-button uk-button-default">
            Нет
          </button>
          <button type="button" onClick={handleOnDelete} data-dismiss="modal" className="uk-button uk-button-default uk-margin-small-left">
            Да
          </button>
        </div>
      </div>
    </div>
  </div>
);
