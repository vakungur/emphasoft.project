import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UsersCollection from '../components/UsersCollection';
import { fetchAllUsers } from '../redux/actions/usersActionsCreators';

const UsersPage = ({ loading, users, dispatchFetchAllUsersAction }) => {

  useEffect(() => dispatchFetchAllUsersAction(), [dispatchFetchAllUsersAction]);

  return (
    <>
      <div className="uk-flex uk-flex-between@s  uk-flex-wrap">
        <div>
          <h2>Список пользователей</h2>
        </div>
        <button className="uk-button uk-button-default">
          <Link to="/edit-user" className="uk-link-reset">
            Добавить пользователя<span className="uk-margin-small-left uk-icon-link" data-uk-icon="plus"/>
          </Link>
        </button>
      </div>

      <div>
        <div>
          {
            users.length > 0 ? <UsersCollection users={users}/> : (
              <div className="uk-position-center">
                  <h2>Нет пользователей</h2>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.loading,
  users: state.users,
});
const mapDispatchToProps = dispatch => ({
  dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
