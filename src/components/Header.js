import React from 'react';
import logo from '../images/logo.svg';
function Header() {
    return (
        <header className="header">
            <img className="logo" alt="лого место россия" src={logo}/>
        </header>
    );
}

export default Header;
