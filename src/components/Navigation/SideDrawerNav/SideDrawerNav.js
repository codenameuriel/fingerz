import React from 'react';
import SideDrawerNavStyles from './SideDrawerNav.module.css';
import NavItem from '../NavItem/NavItem';

const SideDrawerNav = props => {
  return (
      <nav className={SideDrawerNavStyles.SideDrawerNav}>
        <ul>
          <NavItem
            closeSideDrawer={props.closeSideDrawer} 
            name="Type" 
            link="/type"/>
          <NavItem
            closeSideDrawer={props.closeSideDrawer}  
            name="Words" 
            link="/words"/>
        </ul>
      </nav>
  );
};

export default SideDrawerNav;
