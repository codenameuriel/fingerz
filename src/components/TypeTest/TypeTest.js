import React from 'react';
import WordPanel from '../../containers/WordPanel/WordPanel';
import Keyboard from '../../containers/Keyboard/Keyboard';

const TypeTest = () => {
  return (
    <div className="row">
      <WordPanel />
      <Keyboard />
    </div>
  );
};

export default TypeTest;
