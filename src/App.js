import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

import AuthPage from './pages/AuthPage.component';
import UsersPage from './pages/UsersPage.component';
import EditUserPage from './pages/EditUserPage.component';
import Header from './components/Header.component';
import Spinner from './components/spinner/Spinner.component';
import { logoutUser } from './redux/actions/authActionsCreators';

function App({ user, dispatchLogoutAction }) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000}
                      hideProgressBar transition={Slide}/>
      <Spinner/>
      <div>
        {!user.is_active ?
          (<Switch>
            <Route exact path="/auth" component={AuthPage}/>
            <Redirect to="/auth"/>
          </Switch>) : (
            <div className="uk-background-secondary uk-height-viewport uk-light"
                 data-uk-height-viewport="true">
              <div className="uk-container uk-container-large uk-flex uk-flex-column uk-flex-center@s uk-flex-wrap uk-light">
                <Header isActive={user.is_active} userName={user.username} onLogout={dispatchLogoutAction}/>
                <Switch>
                  <Route exact path="/users" component={UsersPage}/>
                  <Route exact path="/edit-user" component={EditUserPage}/>
                  <Route exact path="/edit-user/:userId" component={EditUserPage}/>
                  <Redirect to="/users"/>
                </Switch>
              </div>
            </div>)
        }
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
