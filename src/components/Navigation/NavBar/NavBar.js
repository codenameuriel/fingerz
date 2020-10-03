import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';

const NavBar = () => {
  return (
    <header className={NavBarStyles.NavBar}>
      <nav>
        <ul>
          <NavItem name="Type Test" link="/type-test"/>
          <NavItem name="Words" link="/words"/>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
