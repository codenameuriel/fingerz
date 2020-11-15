import React from 'react';
import NavBarStyles from './NavBar.module.css';
import NavItem from '../NavItem/NavItem';

const NavBar = () => {
  return (
      <nav className={NavBarStyles.Nav}>
        <ul className={NavBarStyles.NavItems}>
          <NavItem
            closeSideDrawer={null} 
            name="Type" 
            link="/type"/>
          <NavItem
            closeSideDrawer={null} 
            name="Words" 
            link="/words"/>
        </ul>
      </nav>
  );
};

export default NavBar;
