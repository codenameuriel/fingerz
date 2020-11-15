import React from 'react';
import ToolbarStyles from './Toolbar.module.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import NavBar from '../NavBar/NavBar';

const Toolbar = props => {
  return (
    <header className={ToolbarStyles.Toolbar}>
      <DrawerToggle />
      <NavBar />
    </header>
  );
}

export default Toolbar;
