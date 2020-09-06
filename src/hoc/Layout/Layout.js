import React from 'react';
import Keyboard from '../../containers/Keyboard/Keyboard';
import WordPanel from '../../containers/WordPanel/WordPanel';
import LayoutStyles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={LayoutStyles.Layout}>
      <WordPanel />
      <Keyboard />
    </div>
  );
}

export default Layout;
