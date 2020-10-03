import React from 'react';
import NavItemStyles from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  return (
    <NavLink to={props.link} className={NavItemStyles.NavItem}>{props.name}</NavLink>
  );
};

export default NavItem;
