import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Pedido.module.css';
import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import { Nav, Button } from 'react-bootstrap';


class Pedido extends Component {

    componentDidMount () {
        this.props.onGetTamanhos();
        this.props.onGetSabores();
        this.props.onGetBordas();
        this.props.onGetAdicionais();        
    }

    render () {
        let pedidoContent = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Pedidos</h6>
                    <Nav className="pull-right">
                        <Nav.Item>
                            <Button variant="outline-light" size="sm" onClick={() => console.log('Novo Pedido clicked')}>
                                <i className="fa fa-plus"></i> 
                                <span> Novo</span>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            hey :)
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
            <Aux>
                {pageContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTamanhos: () => dispatch(actions.getTamanhos()),
        onGetSabores: () => dispatch(actions.getSabores()),
        onGetBordas: () => dispatch(actions.getBordas()),
        onGetAdicionais: () => dispatch(actions.getAdicionais())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);