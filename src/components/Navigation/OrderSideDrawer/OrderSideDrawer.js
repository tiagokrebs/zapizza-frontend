import React, { Component } from 'react';

import classes from './OrderSideDrawer.module.css';

import Backdrop from '../../UI/Backdrop/Backdrop';
import HocAux from '../../../hoc/hocAux/hocAux';
import PedidoForm from '../../../containers/Pedido/PedidoForm/PedidoForm';
// import ScrollBar from '../../UI/ScrollBar/ScrollBar';
import PerfectScrollbar from 'react-perfect-scrollbar'

/**
 * Componente para inserção de novos pedidos
 * renderizado apenas quando usuário está autenticado
 * @param {*} props
 */
class OrderSideDrawer extends Component {
    render () {
        let attachedClasses = [classes.OrderSideDrawer, classes.Close];
        if (this.props.open) {
            attachedClasses = [classes.OrderSideDrawer, classes.Open];
        }
        return (
            this.props.isAuthenticated ? (
                <HocAux>
                    <Backdrop show={this.props.open} clicked={this.props.closed}/>
                    <div className={attachedClasses.join(' ')}>
                        <PerfectScrollbar
                            ref = {(ref) => { this._scrollBarRef = ref; }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        {
                                            this.props.open ? 
                                            <PedidoForm 
                                                onUpdateSize = {() => { this._scrollBarRef.updateScroll(); }}
                                                cancelAll={this.props.closed}/> : 
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </HocAux>
            ) : null
        );
    }
};

export default OrderSideDrawer;
