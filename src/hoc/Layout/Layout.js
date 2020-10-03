import React from 'react';
import LayoutStyles from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

const Layout = props => {
  return (
    <div className={LayoutStyles.Layout}>
      <NavBar />
      {props.children}
    </div>
  );
}

export default Layout;
