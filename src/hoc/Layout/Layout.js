import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = props => {
  return (
    <>
      <Toolbar />
      <main>
        {props.children}
      </main>
    </>
  );
}

export default Layout;
