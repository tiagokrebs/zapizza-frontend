import React, { Component } from 'react';

import classes from './PesquisaCliente.module.css';
import { Form } from 'react-bootstrap';
import Select from '../../../../components/UI/Select/Select';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

class PesquisaCliente extends Component {
    state = {
        selectedClient: {
            nome: '',
            telefone: '',
            endereco: ''
        },
    }

    getAsyncOptions = (inputValue) => {
        if (/^[0-9]+$/.test(inputValue)) {
            // quando input possui apenas números pesquisa por telefone é disparada
            return this.props.asyncSelectClientes(null, inputValue)
        }
        return this.props.asyncSelectClientes(inputValue, null);
    }

    /* componente Select requer métodos onChange e onBlur específicos
    método não segue padrão target.value...
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
    }

    onChange = (value, action) => {
        if (action.action === 'clear' || value === null) {
            this.setState({
                selectedClient: {
                    nome: '',
                    telefone: '',
                    endereco: ''
                }
            });
        }

        if (action.action === "select-option") {
            this.props.getClienteData(value.value)
            .then(response => {
                const cliente = response.data.data.cliente;
                let telefone = 'Não informado';
                if (cliente.telefones.length > 0) {
                    let conformMask = conformToMask(cliente.telefones[0].telefone, masks.telefone, {guide: false});
                    telefone = conformMask.conformedValue;
                }

                let endereco = 'Não informado';
                if (cliente.enderecos.length > 0) {
                    const end = cliente.enderecos[0];
                    endereco = end.logradouro + 
                        (end.numero ? ', ' + end.numero : '') +
                        (end.complemento ? ', ' + end.complemento : '') +
                        (end.bairro ? ', ' + end.bairro : '') +
                        (end.cidade ? ', ' + end.cidade : '')
                }

                this.setState({
                    selectedClient: {
                        nome: cliente.nome,
                        telefone: telefone,
                        endereco: endereco
                    },
                });
            })
        }

        const event = {
            target: {
                name: 'cliente',
                value: value ? value.value : ''
            }
        };
        this.props.inputChangeHandler(event);
    }

    render () {
        return (
            <div className={`col-sm-12 ${classes.PesquisaCliente}`}>
                <Form.Group className="row">
                    <div className="col-lg-12 col-md-12">
                        <Select
                            isClearable
                            isSearchable
                            placeholder="Informe o nome ou telefone"
                            noOptionsMessage={() => "Nenhum resultado encontrado"}
                            loadingMessage={() => "Carregando..."}
                            defaultOptions={false}
                            loadOptions={inputValue => this.getAsyncOptions(inputValue)}
                            cacheOptions
                            isMulti={false}
                            onInputChange={this.onInputChange}
                            onChange={this.onChange}
                            async
                            debouncedLoad
                            wait={1000}/>
                    </div>
                    {
                        this.state.selectedClient.nome && this.state.selectedClient.telefone && this.state.selectedClient.endereco ?
                        (<div className="col-lg-12 col-md-12">
                            <div className={`card ${classes.Card}`}>
                                <div className={`card-block ${classes.CardBlock}`}>
                                        <div className="col-md-12" style={{textAlign: 'center'}}>
                                            <div style={{color: '#000000'}}>
                                                <h6>{this.state.selectedClient.nome}</h6>
                                            </div>
                                            <div style={{color: '#4d88c4'}}>
                                                <h6>{this.state.selectedClient.telefone}</h6>
                                            </div>
                                            <div style={{color: '#316293'}}>
                                                <small>{this.state.selectedClient.endereco}</small>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>) : null
                    }
                </Form.Group>
            </div>
        );
    }
}

export default PesquisaCliente;