import React from 'react';
import NavItemStyles from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  return (
    <li className={NavItemStyles.NavItem}>
      <NavLink to={props.link}>{props.name}</NavLink>
    </li>
  );
};

export default NavItem;
