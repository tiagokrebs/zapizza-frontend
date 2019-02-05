import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormControl } from 'react-bootstrap';
import ZapSpinner from '../../../../components/UI/ZappSpinner/ZappSpinner';
import classes from './TamanhoForm.module.css';
import * as yup from 'yup';
import * as actions from '../../../../store/actions';
import updateObject from '../../../../shared/updateObject';

class TamanhoForm extends Component {
    state = {
        loading: false,
        inputs: {
            hash_id: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            descricao: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            sigla: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            quantSabores: {
                value: '0',
                invalid: false,
                error: '',
                touched: true
            },
            quantBordas: {
                value: '0',
                invalid: false,
                error: '',
                touched: true
            },
            quantFatias: {
                value: '0',
                invalid: false,
                error: '',
                touched: true
            }
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    componentDidMount () {
        if (this.props.formAction === 'update') {
            // percorre lista de objetos a procura do selecionado
            this.props.tamanhos.forEach(item => {
                if (item.hash_id === this.props.elementId) {
                    // Reinicia validade dos inputs do formulario
                    let updatedInputs = this.state.inputs;
                    for (let key in this.state.inputs) {
                        const updatedFormElement = updateObject(this.state.inputs[key], {
                            value: item[key]
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
                },
                number: {
                    integer: 'Informe um número',
                    positive: 'Informe um número positivo',
                    min: 'Quantidade mínima 1'
                }
            });

            // Cria schema de validacao
            const schema = yup.object().shape({
                // hash_ip: yup
                //     .string()
                //     .required(),
                descricao: yup
                    .string()
                    .required(),
                sigla: yup
                    .string()
                    .required(),
                quantSabores: yup
                    .number()
                    .required()
                    .integer()
                    .positive()
                    .min(1),
                quantBordas: yup
                    .number()
                    .required()
                    .integer()
                    .positive(),
                quantFatias: yup
                    .number()
                    .required()
                    .integer()
                    .positive()
                    .min(1)
            });

            // Cria objeto com base em state para validacao
            let formValues = {};
            for (let key in this.state.inputs) {
                formValues[key] = this.state.inputs[key].value;
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
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        this.checkFormIsValid()
            .then(() => {
                let tamanhoData = {
                    descricao: this.state.inputs.descricao.value,
                    sigla: this.state.inputs.sigla.value,
                    quantSabores: this.state.inputs.quantSabores.value,
                    quantFatias: this.state.inputs.quantFatias.value,
                    quantBordas: this.state.inputs.quantBordas.value
                }

                if (this.props.formAction === 'insert') {
                    this.props.onPostTamanho(tamanhoData)
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
                    this.props.onPutTamanho(this.state.inputs.hash_id.value, tamanhoData)
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
        let form = (
            <Form noValidate onSubmit={this.submitHandler}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className={classes.TamanhoForm}>
                                <Form.Group className="row">
                                    <div className="col-lg-9 col-md-9">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="descricao"
                                            value={this.state.inputs.descricao.value}
                                            onChange={this.inputChangeHandler}
                                            onBlur={this.inputBlurHandler}
                                            isInvalid={this.state.inputs.descricao.touched && this.state.inputs.descricao.invalid}
                                            autoFocus
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {this.state.inputs.descricao.error}
                                        </FormControl.Feedback>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <Form.Label>Sigla</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="sigla"
                                                maxLength="3"
                                                value={this.state.inputs.sigla.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.sigla.touched && this.state.inputs.sigla.invalid}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.sigla.error}
                                            </FormControl.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <Form.Label>Sabores</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantSabores"
                                                value={this.state.inputs.quantSabores.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.quantSabores.touched && this.state.inputs.quantSabores.invalid}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.quantSabores.error}
                                            </FormControl.Feedback>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <Form.Label>Fatias</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantFatias"
                                                value={this.state.inputs.quantFatias.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.quantFatias.touched && this.state.inputs.quantFatias.invalid}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.quantFatias.error}
                                            </FormControl.Feedback>    
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <Form.Label>Bordas</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantBordas"
                                                value={this.state.inputs.quantBordas.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.quantBordas.touched && this.state.inputs.quantBordas.invalid}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.quantBordas.error}
                                            </FormControl.Feedback>    
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className={classes.TamanhoFormFooter}>
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

        let message = null;
        // if (this.props.error) {
        //     if (this.props.error.errors) {

        //     }
        //     message = (
        //         <Alert dismissible variant="danger">{this.props.error.message}</Alert>
        //     );
        // } 

        // let formRedirect;
        // if (this.state.formSubmitSuceed) {
        //     formRedirect = <Redirect to="/" />;
        // }

        let pageContent = (
            <div className="row">
                {/* {formRedirect} */}
                <div className="col-sm-12">
                    {message}
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
        pending: state.pizza.tamanho.api.pending,
        error: state.pizza.tamanho.api.error,
        tamanhos: state.pizza.tamanho.tamanhos
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPostTamanho: (tamanhoData) => dispatch(actions.postTamanho(tamanhoData)),
        onPutTamanho: (tamanhoId, tamanhoData) => dispatch(actions.putTamanho(tamanhoId, tamanhoData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TamanhoForm);