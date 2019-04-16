import React from 'react';

import classes from './OrderSideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import PedidoForm from '../../../containers/Pedido/PedidoForm/PedidoForm';

const orderSideDrawer = ( props ) => {
    let attachedClasses = [classes.OrderSideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.OrderSideDrawer, classes.Open];
    }
    return (
        <Aux>
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
        </Aux>
    );
};

export default orderSideDrawer;