import React from 'react';
import SideDrawerStyles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SideDrawerNav from '../SideDrawerNav/SideDrawerNav';

const SideDrawer = props => {
  let drawerStyles = [ SideDrawerStyles.SideDrawer, SideDrawerStyles.Hide ];

  if (props.show) drawerStyles = [ SideDrawerStyles.SideDrawer, SideDrawerStyles.Show ];

  return (
    <>
      <Backdrop showBackdrop={props.show} closeSideDrawer={props.close}/>
      <div className={drawerStyles.join(' ')}>
        <SideDrawerNav closeSideDrawer={props.close}/>
      </div>
    </>
  );
}

export default SideDrawer;
