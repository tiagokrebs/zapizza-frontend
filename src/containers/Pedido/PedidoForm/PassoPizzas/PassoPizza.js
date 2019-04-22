import React, { Component } from 'react';

import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classes from './PassoPizzas.module.css';
import Select from '../../../../components/UI/Select/Select';

class PassoPizzas extends Component {
    tamanhosRef = React.createRef();

    componentDidMount = () => {
        if (this.props.pizzaId === 0) {
            this.tamanhosRef.current.focus();
        }
    }

    getSelectSabores = () => {
        let sabores = this.props.sabores.map((sabor) => {
            if (sabor.ativo) {
                return {
                    label: sabor.descricao,
                    value: sabor.hash_id
                }
            }
            return {
                label: sabor.descricao,
                value: sabor.hash_id,
                disable: true
            }
        });
        return sabores;
    }

    getSelectBordas = () => {
        let bordas = this.props.bordas.map((borda) => {
            if (borda.ativo) {
                return {
                    label: borda.descricao,
                    value: borda.hash_id
                }
            }
            return {
                label: borda.descricao,
                value: borda.hash_id,
                disable: true
            }
        });
        return bordas;
    }

    onTamanhoKeyDown = (e) => {
        const siglas = this.props.tamanhos.map((tamanho) => tamanho.sigla.toLowerCase());
        const key = e.key.toLowerCase();
        if (siglas.includes(key)) {
            let value;
            this.props.tamanhos.forEach((tamanho) => {
                if (tamanho.sigla.toLowerCase() === key) {
                    value = tamanho.hash_id
                }
            })

            const event = {
                target: {
                    name: 'tamanho',
                    value: value,
                    id: e.currentTarget.id
                }
            };
            this.props.inputChangeHandler(event);
        }
    }

    onTamanhoClick = hash_id => e => {
        const event = {
            target: {
                name: 'tamanho',
                value: hash_id,
                id: e.target.id
            }
        };
        this.props.inputChangeHandler(event);
    }

    render () {
        const sabores = this.getSelectSabores();
        /**
         * Cores para tamanhos das pizzas disponíveis
         * Para sabores com index maior que 7 cor dark é utilizada
         */
        const tamanhoCor = ['primary', 'success', 'warning', 'info', 'secondary', 'dark']

        return (
            <div className={`col-lg-12 col-md-12 ${classes.PassoPizzas}`}>
                <Form.Label>Tamanho</Form.Label>
                <Form.Group className="row">
                    <div tabIndex={this.props.pizzaId} 
                        className="col-lg-12 col-md-12" 
                        style={{textAlign: 'center'}}
                        onKeyDown={this.onTamanhoKeyDown} 
                        ref={this.tamanhosRef}
                        id={this.props.pizzaId}>
                        {
                            this.props.tamanhos.map((tamanho, index) => {
                                if (tamanho.ativo) {
                                    return (
                                        <OverlayTrigger key={tamanho.hash_id} placement='top' trigger='hover' overlay={
                                            <Tooltip id={`tooltip-${tamanho.hash_id}`}>
                                              {tamanho.descricao}
                                            </Tooltip>
                                            }>
                                            <Button 
                                                tabIndex={index !== 0 ? "-1" : "0"}
                                                variant={index <= 5 ? `outline-${tamanhoCor[index]}` : "outline-dark"} 
                                                className={classes.CircularButtonM}
                                                active={tamanho.hash_id === this.props.pizza.tamanho.value}
                                                id={this.props.pizzaId}
                                                onClick={this.onTamanhoClick(tamanho.hash_id)}
                                            >
                                                {tamanho.sigla}
                                            </Button>
                                        </OverlayTrigger>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sabores</Form.Label>
                    <Select 
                        value={this.props.pizza.sabores}
                        options={this.getSelectSabores()}
                        isClearable
                        isSearchable
                        placeholder="Selecione o(s) sabor(es)"
                        isMulti
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bordas</Form.Label>
                    <Select 
                        value={this.props.pizza.bordas}
                        options={this.getSelectBordas()}
                        isClearable
                        isSearchable
                        placeholder="Selecione a(s) Borda(s)"
                        isMulti
                    />
                </Form.Group>
            </div>
        );
    }
}

export default PassoPizzas;