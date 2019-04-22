import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import DrawerUser from './DrawerUser/DrawerUser';
import DrawerMenu from './DrawerMenu/DrawerMenu';

/**
 * Componente do menu principal da aplicação
 * renderizando apenas quando usuário está autenticado
 * @param {*} props 
 */
const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        props.isAuthenticated ? (
            <Aux>
                <Backdrop show={props.open} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <DrawerUser userName={props.userName}/>
                    <DrawerMenu clicked={props.closed}/>
                    <hr/>
                </div>
            </Aux>
        ) : null
    );
};

export default sideDrawer;