import React from 'react';
import LayoutStyles from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

const Layout = props => {
  return (
    <div className={LayoutStyles.Layout}>
      <div className="row">
        <NavBar />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
