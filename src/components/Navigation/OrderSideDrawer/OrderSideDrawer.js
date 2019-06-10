import React from 'react';

import classes from './OrderSideDrawer.module.css';

import Backdrop from '../../UI/Backdrop/Backdrop';
import HocAux from '../../../hoc/hocAux/hocAux';
import PedidoForm from '../../../containers/Pedido/PedidoForm/PedidoForm';
import ScrollBar from '../../UI/ScrollBar/ScrollBar';

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
                    <ScrollBar>
                      <div className="container">
                          <div className="row">
                              <div className="col-sm-12">
                                    {props.open ? <PedidoForm /> : null}
                              </div>
                          </div>
                      </div>
                    </ScrollBar>
                  </div>
            </HocAux>
        ) : null
    );
};

export default orderSideDrawer;
