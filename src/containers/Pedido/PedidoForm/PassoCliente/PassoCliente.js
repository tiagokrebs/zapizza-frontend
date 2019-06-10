import React, { Component } from 'react';

import classes from './PassoCliente.module.css';
import { Form } from 'react-bootstrap';
import Select from '../../../../components/UI/Select/Select';

class PassoCliente extends Component {
    getAsyncOptions = (inputValue) => {
        if (/^[0-9]+$/.test(inputValue)) {
            // quando input possui apenas números pesquisa por telefone é disparada
            return this.props.asyncSelectClientes(null, inputValue)
        }
        return this.props.asyncSelectClientes(inputValue, null);
    }

    /* componente Select requer métodos onChange e onBlur específicos
    métodos defaul do componente não segue padrão target.value...
    padrão é simulado e passado aos métodos change/blur do parent
    */
    onInputChange = (value, action) => {
        if (action.action === 'input-blur') {
            const event = {
                target: {
                    name: 'cliente'
                }
            };
            this.props.inputBlurHandler(event);
        }
        /**
         * Controle do valor da label e value via state do select foi ignorado,
         * função precisa de melhoras como deleção completa nas teclas backspace e delete,
         * garantia de exibição da label após seleção, ...
        */
        // else if (action.action === 'input-change') {
        //     const event = {
        //         target: {
        //             name: 'cliente',
        //             label: value ? value : ''
        //         }
        //     };
        //     this.props.inputChangeHandler(event);
        // }
    }

    onChange = (value, action) => {
        if (action.action === "select-option") {
            this.props.getClienteData(value.value);
        }
    }

    selectOnKeyDown = (refName) => {
        /**
         * Tab no último componente faz tentativa de ativar o próximo passo
         * para isso função de validação dos dados atuais é chamada
         */
        if (refName.keyCode === 9) {
            this.props.handleComplete();
        }
    }

    render () {
        return (
            <div className={`col-sm-12 ${classes.PassoCliente}`}>
                <Form.Group className="row">
                    <div className="col-lg-12 col-md-12">
                        <Select
                            autoFocus
                            isClearable
                            isSearchable
                            placeholder="Nome ou telefone"
                            noOptionsMessage={({inputValue}) => !inputValue ? "Informe o nome ou telefone" : "Nenhum cliente encontrado"}
                            loadingMessage={() => "Carregando..."}
                            defaultOptions={false}
                            loadOptions={inputValue => this.getAsyncOptions(inputValue)}
                            cacheOptions
                            isMulti={false}
                            onInputChange={this.onInputChange}
                            onChange={this.onChange}
                            onKeyDown={this.selectOnKeyDown}
                            async
                            debouncedLoad
                            wait={1000}
                            isInvalid={this.props.cliente.touched && this.props.cliente.invalid}
                            invalidFeedback={this.props.cliente.error}
                            />
                    </div>
                    {
                        this.props.selectedClienteData.nome && this.props.selectedClienteData.telefone && this.props.selectedClienteData.endereco ?
                        (<div className="col-lg-12 col-md-12">
                            <div className={`card ${classes.Card}`}>
                                <div className={`card-block ${classes.CardBlock}`}>
                                        <div className="col-md-12" style={{textAlign: 'center'}}>
                                            <div style={{color: '#000000'}}>
                                                <h6>{this.props.selectedClienteData.nome}</h6>
                                            </div>
                                            <div style={{color: '#4d88c4'}}>
                                                <h6>{this.props.selectedClienteData.telefone}</h6>
                                            </div>
                                            <div style={{color: '#316293'}}>
                                                <small>{this.props.selectedClienteData.endereco}</small>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>) : null
                    }
                </Form.Group>
                <hr/>
                {this.props.stepDefultButtons}
            </div>
        );
    }
}

export default PassoCliente;
