import React from 'react';
import BackdropStyles from './Backdrop.module.css';

const Backdrop = props => {
  return (
    props.showBackdrop ? <div className={BackdropStyles.Backdrop} onClick={() => props.closeSideDrawer(prevState => false)}></div> : null
  );
}

export default Backdrop;
