import React from 'react';
import WordPanel from '../../containers/WordPanel/WordPanel';
import Keyboard from '../../containers/Keyboard/Keyboard';
import TypeTestStyles from './TypeTest.module.css';

const TypeTest = () => {
  return (
    <div className={TypeTestStyles.TypeTest}>
      <WordPanel />
      <Keyboard />
    </div>
  );
};

export default TypeTest;
