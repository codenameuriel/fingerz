import React from 'react';
import ButtonStyles from './Button.module.css';

const Button = props => {
  return (
    <button className={ButtonStyles.Button} onClick={props.handleClick}>{props.text}</button>
  );
};

export default Button;
