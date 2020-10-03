import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';

const NavBar = () => {
  return (
    <header className={NavBarStyles.NavBar}>
      <nav>
        <ul>
          <NavItem name="Home" link="/"/>
          <NavItem name="Words" link="/words"/>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
