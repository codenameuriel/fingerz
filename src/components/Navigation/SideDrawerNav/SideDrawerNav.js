import React from 'react';
import SideDrawerNavStyles from './SideDrawerNav.module.css';
import NavItem from '../NavItem/NavItem';

const SideDrawerNav = () => {
  return (
      <nav className={SideDrawerNavStyles.SideDrawerNav}>
        <ul>
          <NavItem name="Type" link="/type"/>
          <NavItem name="Words" link="/words"/>
        </ul>
      </nav>
  );
};

export default SideDrawerNav;
