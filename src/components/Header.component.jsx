import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userName, isActive, onLogout }) => (

    <div className="uk-flex uk-flex-between uk-background-secondary uk-light">
        <Link className="uk-navbar-item uk-logo" to="/">
          <div>
            <span data-uk-icon="icon: home; ratio: 3"/>
          </div>
        </Link>
        <div className="uk-flex uk-flex-column uk-margin">
          {isActive &&
          <h4>
            Добро пожаловать {userName} !
          </h4>
          }
          {isActive &&
          <button className="uk-button uk-button-default" type="button" onClick={onLogout}>
            Выйти | <span className="uk-margin-small-left uk-icon-link" data-uk-icon="sign-out"/>
          </button>}
        </div>
    </div>
);

export default Header;
