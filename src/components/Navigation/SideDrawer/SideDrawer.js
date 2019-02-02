import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import DrawerUser from './DrawerUser/DrawerUser';
import DrawerMenu from './DrawerMenu/DrawerMenu';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <DrawerUser userName={props.userName}/>
                <DrawerMenu clicked={props.closed}/>
                <hr/>
            </div>
        </Aux>
    );
};

export default sideDrawer;