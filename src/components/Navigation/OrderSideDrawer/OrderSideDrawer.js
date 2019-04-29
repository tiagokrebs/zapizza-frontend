import React from 'react';

import classes from './OrderSideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import HocAux from '../../../hoc/HocAux/HocAux';
import PedidoForm from '../../../containers/Pedido/PedidoForm/PedidoForm';

/**
 * Componente para inserção de novos pedidos
 * renderizado apenas quando usuário está autenticado
 * @param {*} props 
 */
const orderSideDrawer = ( props ) => {
    let attachedClasses = [classes.OrderSideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.OrderSideDrawer, classes.Open];
    }
    return (
        props.isAuthenticated ? (
            <HocAux>
                <Backdrop show={props.open} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className={`card ${classes.Card}`}>
                                    <PedidoForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HocAux>
        ) : null
    );
};

export default orderSideDrawer;