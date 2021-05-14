import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';


function Header(props) {
    const { email, loggedIn, onSignOut} = props;
    return (
        <header className="header">
            <img className="logo" alt="Логотип: надпись Mesto.Russia" src={logo}/>
            <div className="header__link-container">

        {loggedIn ?
        <>
          <p className="header__mail">{email}</p>
          <NavLink to="/login" className="header__link header__link_shadow" activeClassName="header__link_hidden" onClick={onSignOut}>Выйти</NavLink>
        </>
        :
        <>
        <NavLink to="/register" className="header__link" activeClassName="header__link_hidden" >Регистрация</NavLink>
        <NavLink to="/login" className="header__link" activeClassName="header__link_hidden" >Войти</NavLink>
        </>
        }
      </div>
        </header>
    );
}

export default Header;
