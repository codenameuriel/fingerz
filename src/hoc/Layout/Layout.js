import React from 'react';
import NavBar from '../../components/Navigation/NavBar/NavBar';

const Layout = props => {
  return (
    <div>
      <div>
        <NavBar />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
