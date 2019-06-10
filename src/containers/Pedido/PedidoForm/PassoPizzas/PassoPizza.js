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

    onTamanhoBlur = (e) => {
        const event = {
            target: {
                name: 'tamanho',
                id: this.props.pizzaId
            }
        };
        this.props.inputBlurHandler(event);
    }

    selectChangeHandler = field => (value, action) => {
        /**
         * select-option insere valor em state do parent
         * pop-value retira valor em state do parent
         * action possui objeto específico inserido/removido
         */
        if (action.action === 'select-option' || action.action === 'pop-value' || action.action === 'remove-value') {
            // lista de objetos selecionados diretamente para o state do parent
            const event = {
                target: {
                    name: field,
                    value: value,
                    id: this.props.pizzaId
                }
            };
            this.props.inputChangeHandler(event);
        }
    }

    selectBlurHandler = field => (value, action) => {
        if (action.action === 'input-blur') {
            const event = {
                target: {
                    name: field,
                    id: this.props.pizzaId
                }
            };
            this.props.inputBlurHandler(event);
        }
    }

    selectOnKeyDown = (e) => {
        /**
         * Tab no último componente faz tentativa de ativar o próximo passo
         * para isso função de validação dos dados atuais é chamada
         */
        if (e.keyCode === 9) {
            e.preventDefault();
            this.props.handleComplete();
        }
    }

    render () {
        /**
         * Cores para tamanhos das pizzas disponíveis
         * Para sabores com index maior que 7 cor dark é utilizada
         */
        const tamanhoCor = ['primary', 'success', 'warning', 'info', 'secondary', 'dark']

        const label = (
            <div style={{textAlign: 'center', display: 'flex'}}>
                <span><strong>Pizza #{[this.props.pizzaId+1]}</strong></span>
                <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={this.props.addPizza}></i></span>
                <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={this.props.remPizza} id={this.props.pizzaId}></i></span>
            </div>
        );

        return (
            <div className={`col-lg-12 col-md-12 ${classes.PassoPizzas}`}>
                {label}
                <Form.Label>Tamanho</Form.Label>
                <Form.Group className="row">
                    <div tabIndex={this.props.pizzaId}
                        className="col-lg-12 col-md-12"
                        style={{textAlign: 'center'}}
                        onKeyDown={this.onTamanhoKeyDown}
                        onBlur={this.onTamanhoBlur}
                        ref={this.tamanhosRef}
                        id={this.props.pizzaId}>
                        {
                          // todo: tamanho pode ser um componente stateless a parte
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
                                                {/* {tamanho.sigla.toUpperCase()} */}
                                                {tamanho.descricao}
                                            </Button>
                                        </OverlayTrigger>
                                    )
                                }
                                return null;
                            })
                        }
                        {
                            this.props.pizza.tamanho.touched && this.props.pizza.tamanho.invalid && (
                                <div style={{display: 'block', marginTop: '.25rem', fontSize: '80%', color: '#dc3545'}}>
                                    {this.props.pizza.tamanho.error}
                                </div>
                            )
                        }
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sabores</Form.Label>
                    <Select
                        value={this.props.pizza.sabores.value}
                        options={this.getSelectSabores()}
                        onChange={this.selectChangeHandler('sabores')}
                        onInputChange={this.selectBlurHandler('sabores')}
                        isClearable
                        isSearchable
                        placeholder="Selecione o(s) sabor(es)"
                        isMulti
                        isInvalid={this.props.pizza.sabores.touched && this.props.pizza.sabores.invalid}
                        invalidFeedback={this.props.pizza.sabores.error}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bordas</Form.Label>
                    <Select
                        value={this.props.pizza.bordas.value}
                        options={this.getSelectBordas()}
                        onChange={this.selectChangeHandler('bordas')}
                        onInputChange={this.selectBlurHandler('bordas')}
                        onKeyDown={this.selectOnKeyDown} // último contém validação/conclusão em tab
                        isClearable
                        isSearchable
                        placeholder="Selecione a(s) Borda(s)"
                        isMulti
                        isInvalid={this.props.pizza.bordas.touched && this.props.pizza.bordas.invalid}
                        invalidFeedback={this.props.pizza.bordas.error}
                    />
                </Form.Group>
                <hr/>
                {this.props.stepDefultButtons}
            </div>
        );
    }
}

export default PassoPizzas;
