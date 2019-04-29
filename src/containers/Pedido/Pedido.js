import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Pedido.module.css';
import HocAux from '../../hoc/HocAux/HocAux';
// import { Nav, Button } from 'react-bootstrap';


class Pedido extends Component {

    componentDidMount () {       
    }

    render () {
        let pedidoContent = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de Pedidos</h6>
                    {/* <Nav className="pull-right">
                        <Nav.Item>
                            <Button variant="primary" size="sm" onClick={() => console.log('Novo Pedido clicked')}>
                                <i className="fa fa-plus"></i> 
                                <span> Novo Pedido</span>
                            </Button>
                        </Nav.Item>
                    </Nav> */}
                </div>
                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            
                        </div>
                    </div>
                </div>
            </div>
        );

        let pageContent = (
            <div className="row">
                <div className="col-sm-12">
                    <div className={`card ${classes.Card}`}>
                        {pedidoContent}
                    </div>
                </div>
            </div>
        );

        return (
            <HocAux>
                {pageContent}
            </HocAux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);