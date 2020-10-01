import React from 'react';
import NavItemStyles from './NavItem.module.css';

const NavItem = prop => {
  return (
    <li className={NavItemStyles.NavItem}>{prop.name}</li>
  );
};

export default NavItem;
