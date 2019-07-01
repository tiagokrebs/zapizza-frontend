import React, { Component } from 'react';

import classes from './PedidoResumo.module.css';
import { Button } from 'react-bootstrap';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

class PedidoResumo extends Component {
    render() {
        return (
            <div className={`card ${classes.Card}`}>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Resumo</h6>
                    <small>Valor total das pizzas, adicionais e valor da entrega</small>
                </div>
                <div className={`card-block ${classes.CardBlock}`}>
                    <div className={classes.Totais}>
                        <div style={{ paddingTop: '1rem' }}>
                            <div className="row">
                                <div className="col-sm-9">
                                    <strong>Pizzas</strong>
                                </div>
                                <div className="col-sm-3">
                                    <strong>{`$ ${conformToMask(this.props.totalPizzas.toString().replace(/\./g, ','), masks.valorP6S2, { guide: false }).conformedValue}`}</strong>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" style={{display: 'grid'}}>
                                    {
                                        this.props.resumoPizzas.map((resumo, index) => {
                                            return <small key={index}>{resumo}</small>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <div className="row">
                                <div className="col-sm-9">
                                    <strong>Adicionais</strong>
                                </div>
                                <div className="col-sm-3">
                                    <strong>{`$ ${conformToMask(this.props.totalAdicionais.toString().replace(/\./g, ','), masks.valorP6S2, { guide: false }).conformedValue}`}</strong>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <small>{this.props.resumoAdicionais}</small>
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <div className="row">
                                <div className="col-sm-9">
                                    <strong>Entrega</strong>
                                </div>
                                <div className="col-sm-3">
                                    <strong>{`$ ${conformToMask(this.props.totalEntrega.toString().replace(/\./g, ','), masks.valorP6S2, { guide: false }).conformedValue}`}</strong>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <small>{this.props.resumoEntrega}</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="row">
                                <div className="col-sm-9">
                                </div>
                                <div className="col-sm-3">
                                    <strong>{`$ ${conformToMask(this.props.totalPedido.toString().replace(/\./g, ','), masks.valorP6S2, { guide: false }).conformedValue}`}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Buttons}>
                        <Button type="submit" name="form.submitted" size="sm">
                            Finalizar
                        </Button>
                        <Button style={{marginLeft: '8px'}} variant="danger" size="sm" onClick={this.props.cancelAction}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PedidoResumo;