import React, { Component } from 'react';

import classes from './PedidoResumo.module.css';
import { Button } from 'react-bootstrap';

class PedidoResumo extends Component {
    render () {
        return (
            // <div className="row">
            //     <div className="col-sm-12">
                    <div className={`card ${classes.Card}`}>
                        <div className={`card-header ${classes.CardHeader}`}>
                            <h6 className={`card-title ${classes.CardTitle}`}>Resumo</h6>
                            <small>Valor total das pizzas, adicionais e valor da entrega</small>
                        </div>
                        <div className={`card-block ${classes.CardBlock}`}>
                            <div className={classes.Totais}>
                                <div style={{paddingTop: '1rem'}}>
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <strong>Pizzas</strong>
                                        </div>
                                        <div className="col-sm-3">
                                            <strong>$ 48,00</strong>
                                        </div>
                                    </div>
                                </div>
                                <div style={{paddingTop: '1rem'}}>
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <strong>Adicionais</strong>
                                        </div>
                                        <div className="col-sm-3">
                                            <strong>$ 10,00</strong>
                                        </div>
                                    </div>
                                </div>
                                <div style={{paddingTop: '1rem'}}>
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <strong>Entrega</strong>
                                        </div>
                                        <div className="col-sm-3">
                                            <strong>$ 6,00</strong>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    <div className="row">
                                        <div className="col-sm-9">
                                        </div>
                                        <div className="col-sm-3">
                                            <strong>$ 64,00</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" name="form.submitted" size="sm">
                                Finalizar
                            </Button>
                        </div>
                    </div>
            //     </div>
            // </div>
        );
    }
}

export default PedidoResumo;