import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import userIcon from '../assets/static/user-icon.png';

const Header = props => {

  const { user } = props;
  const hashUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({})
  }

  return(
    <header className="header">
      <Link to='/'>
        <p className="header__logo">VideoPlayer</p>
      </Link>

      <div className="header__menu">
        <div className="header__menu--profile">
          {
            hashUser
              ? <img src={gravatar(user.email)} alt={user.email} />
              : <img src={userIcon} alt="" />
          }
          <p>Perfil</p>
        </div>
        <ul>
          {
            hashUser
              ? <>
                  <li><a href="/">{user.name}</a></li>
                  <li>
                    <a href="#logout" onClick={handleLogout}>
                      Cerrar sesión
                    </a>
                  </li>
                </>
              : <li>
                  <Link to="/login">
                    Iniciar sesión
                  </Link>
                </li>
          }
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);