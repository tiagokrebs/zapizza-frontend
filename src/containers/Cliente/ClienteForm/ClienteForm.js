import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormControl } from 'react-bootstrap';
import ZapSpinner from '../../../components/ZappSpinner/ZappSpinner';
import classes from './ClienteForm.module.css';
import * as yup from 'yup';
import * as actions from '../../../store/actions';
import updateObject from '../../../shared/updateObject';
import MaskedInput, { conformToMask } from 'react-text-mask';
import * as masks from '../../../shared/inputMasks';

class ClienteForm extends Component {
    state = {
        loading: false,
        inputs: {
            hash_id: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            nome: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            // enderecos: [
            //     {
            //         cep: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         logradouro: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         numero: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         complemento: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         bairro: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         cidade: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         },
            //         estado: {
            //             value: '',
            //             invalid: false,
            //             error: '',
            //             touched: true
            //         }
            //     }
            // ]
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    componentDidMount () {
        if (this.props.formAction === 'update') {
            // percorre lista de objetos a procura do selecionado
            this.props.clientes.forEach(item => {
                if (item.hash_id === this.props.elementId) {
                    // Define valores dos inputs do formulario
                    let updatedInputs = this.state.inputs;
                    for (let key in this.state.inputs) {
                        let v;
                        if (typeof(item[key]) === 'number') {
                            // v = item[key].toString().replace(/\./g, ',');
                            const valorStr = item[key].toString().replace(/\./g, ',');
                            const conformMask = conformToMask(valorStr.toString(), masks.valorP6S2, {guide: false});
                            v = conformMask.conformedValue;
                        } else {
                            v = item[key];
                        }
                        
                        const updatedFormElement = updateObject(this.state.inputs[key], {
                            value: v
                        });

                        updatedInputs = updateObject(updatedInputs, {
                            [key]: updatedFormElement
                        });
                    }
                    this.setState({inputs: updatedInputs});
                }
            });
        }
    }

    inputChangeHandler = (event) => {
        const targetValue = event.target.checked ? event.target.checked : event.target.value;

        const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
            value: targetValue
        });

        const updatedinputs = updateObject(this.state.inputs, {
            [event.target.name]: updatedFormElement
        });
    
        this.setState({inputs: updatedinputs});
    }

    inputBlurHandler = (event) => {
        const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
            touched: true
        });

        const updatedinputs = updateObject(this.state.inputs, {
            [event.target.name]: updatedFormElement
        });

        this.setState({inputs: updatedinputs});
    }

    checkFormIsValid = () => {
        // Retorna Promise para validacao e ajuste de state
        return new Promise((resolve, reject) => {
            // Define dicionario local
            yup.setLocale({
                mixed: {
                    default: 'Campo inválido',
                    required: 'Campo obrigatório',
                    notType: 'Campo inválido'
                }
            });

            // Cria schema de validacao
            const schema = yup.object().shape({
                // hash_ip: yup
                //     .string()
                //     .required(),
                nome: yup
                    .string()
                    .required()
            });

            // Cria objeto com base em state para validacao
            let formValues = {};
            for (let key in this.state.inputs) {
                formValues[key] = this.state.inputs[key].value.toString();
            }

            // Reinicia validade dos inputs do formulario
            let updatedInputs = this.state.inputs;
            for (let key in this.state.inputs) {
                const updatedFormElement = updateObject(this.state.inputs[key], {
                    touched: false,
                    invalid: false,
                    error: null
                });

                updatedInputs = updateObject(updatedInputs, {
                    [key]: updatedFormElement
                });
            }
            this.setState({inputs: updatedInputs});

            // Valida e define retorno dos erros em state
            schema.validate(formValues, {abortEarly: false})
            .catch(error => {
                error.inner.forEach(formElement => {
                    const updatedFormElement = updateObject(this.state.inputs[formElement.path], {
                        touched: true,
                        invalid: true,
                        error: formElement.message
                    });

                    const updatedinputs = updateObject(this.state.inputs, {
                        [formElement.path]: updatedFormElement
                    });

                    this.setState({inputs: updatedinputs});
                });
            });

            // Define validade geral do formulario
            schema.isValid(formValues)
            .then(valid => {
                this.setState({formIsValid: valid});
                if (valid){
                    resolve();
                } else {
                    this.setState({ loading: false });
                }
            });
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        this.checkFormIsValid()
            .then(() => {
                let clienteData = {
                    nome: this.state.inputs.nome.value
                }

                if (this.props.formAction === 'insert') {
                    this.props.onPostCliente(clienteData)
                    .then((response) => {
                        this.setState({formSubmitSuceed: true});
                        this.props.modalClose();
                    })
                    .catch((error) => {
                        // define erros dos inputs do formulario em state
                        let updatedInputs = this.state.inputs;
                        const errors = error.errors;
                        errors.forEach((error) => {
                            const updatedFormElement = updateObject(this.state.inputs[error.field], {
                                touched: true,
                                invalid: true,
                                error: error.message
                            });

                            updatedInputs = updateObject(updatedInputs, {
                                [error.field]: updatedFormElement
                            });
                        });
                        this.setState({inputs: updatedInputs});
                        this.setState({ loading: false });
                    });
                } else if (this.props.formAction === 'update'){
                    this.props.onPutCliente(this.state.inputs.hash_id.value, clienteData)
                    .then((response) => {
                        this.setState({formSubmitSuceed: true});
                        this.props.modalClose();
                    })
                    .catch((error) => {
                        // define erros dos inputs do formulario em state
                        let updatedInputs = this.state.inputs;
                        const errors = error.errors;
                        errors.forEach((error) => {
                            const updatedFormElement = updateObject(this.state.inputs[error.field], {
                                touched: true,
                                invalid: true,
                                error: error.message
                            });

                            updatedInputs = updateObject(updatedInputs, {
                                [error.field]: updatedFormElement
                            });
                        });
                        this.setState({inputs: updatedInputs});
                        this.setState({ loading: false });
                    });
                }
            });        
    }

    render () {
        // let {enderecos} = this.state.inputs
        let form = (
            <Form noValidate onSubmit={this.submitHandler}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className={classes.ClienteForm}>
                                <Form.Group className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={this.state.inputs.nome.value}
                                            onChange={this.inputChangeHandler}
                                            onBlur={this.inputBlurHandler}
                                            isInvalid={this.state.inputs.nome.touched && this.state.inputs.nome.invalid}
                                            autoFocus
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {this.state.inputs.nome.error}
                                        </FormControl.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                {/* {
                                    enderecos.map((valor, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="col-lg-12 col-md-12">
                                                    <Form.Label>CEP</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="cep"
                                                        value={enderecos[index].cep.value}
                                                        onChange={this.inputChangeHandler}
                                                        onBlur={this.inputBlurHandler}
                                                        isInvalid={enderecos[index].cep.touched && enderecos[index].cep.invalid}
                                                    />
                                                    <FormControl.Feedback type="invalid">
                                                        {enderecos[index].cep.error}
                                                    </FormControl.Feedback>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <Form.Label>Logradouro</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="logradouro"
                                                        value={enderecos[index].logradouro.value}
                                                        onChange={this.inputChangeHandler}
                                                        onBlur={this.inputBlurHandler}
                                                        isInvalid={enderecos[index].logradouro.touched && enderecos[index].logradouro.invalid}
                                                    />
                                                    <FormControl.Feedback type="invalid">
                                                        {enderecos[index].logradouro.error}
                                                    </FormControl.Feedback>
                                                </div>
                                            </div>
                                        )
                                    })
                                } */}
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className={classes.ClienteFormFooter}>
                        <Button variant="secondary" onClick={this.props.modalClose}>
                            Cancelar
                        </Button>
                        <Button 
                            variant="success" 
                            type="submit" 
                            name="form.submitted"
                            className="pull-right">Gravar</Button>
                    </div>
            </Form>
        );

        let spinner;
        if (this.state.loading) {
            spinner = <ZapSpinner />
        }

        let pageContent = (
            <div className="row">
                <div className="col-sm-12">
                    {form}
                    {spinner}
                </div>
            </div>
        );

        return (
            <div>
                {pageContent}
            </div>
        );
    }




}

const mapStateToProps = state => {
    return {
        pending: state.cliente.cliente.api.pending,
        error: state.cliente.cliente.api.error,
        clientes: state.cliente.cliente.clientes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPostCliente: (clienteData) => dispatch(actions.postCliente(clienteData)),
        onPutCliente: (clienteId, clienteData) => dispatch(actions.putCliente(clienteId, clienteData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);