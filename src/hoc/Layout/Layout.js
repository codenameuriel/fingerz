import React from 'react';
import Keyboard from '../../containers/Keyboard/Keyboard';
import WordPanel from '../../containers/WordPanel/WordPanel';
import LayoutStyles from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';

const Layout = () => {
  return (
    <div className={LayoutStyles.Layout}>
        <NavBar />
        <WordPanel />
        <Keyboard />
    </div>
  );
}

export default Layout;
