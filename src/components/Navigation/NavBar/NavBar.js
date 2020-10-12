import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';
import Logo from '../../../assets/images/keyboard.png';

const NavBar = () => {
  return (
    <header className={NavBarStyles.Header}>
      <nav className={NavBarStyles.Nav}>
        <div className="row">
          <img src={Logo} alt="Image"/>
          <ul className={NavBarStyles.NavItems}>
            <NavItem name="Type Test" link="/type-test"/>
            <NavItem name="Words" link="/words"/>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
