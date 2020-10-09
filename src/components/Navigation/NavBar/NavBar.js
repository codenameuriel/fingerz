import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';

const NavBar = () => {
  return (
    <header className={NavBarStyles.NavBar}>
      <nav>
        <div className="row">
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
