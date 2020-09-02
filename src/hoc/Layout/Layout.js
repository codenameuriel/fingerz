import React from 'react';
import Keyboard from '../../containers/Keyboard/Keyboard';
import WordPanel from '../../containers/WordPanel/WordPanel';

const Layout = () => {
  return (
    <div>
      <WordPanel />
      <Keyboard />
    </div>
  );
}

export default Layout;
