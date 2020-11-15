import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';

const NavBar = () => {
  return (
      <nav className={NavBarStyles.Nav}>
        <div className="row">
          <ul className={NavBarStyles.NavItems}>
            <NavItem name="Type" link="/type"/>
            <NavItem name="Words" link="/words"/>
          </ul>
        </div>
      </nav>
  );
};

export default NavBar;
