import React from 'react';
import { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [ showSideDrawer, setShowSideDrawer ] = useState(false);

  return (
    <>
      <Toolbar sideDrawerToggle={setShowSideDrawer}/>
      <SideDrawer show={showSideDrawer} close={setShowSideDrawer}/>
      <main>
        {props.children}
      </main>
    </>
  );
}

export default Layout;
