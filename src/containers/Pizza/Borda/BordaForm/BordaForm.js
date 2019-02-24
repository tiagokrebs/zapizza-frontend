import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormControl } from 'react-bootstrap';
import ZapSpinner from '../../../../components/ZappSpinner/ZappSpinner';
import classes from './BordaForm.module.css';
import * as yup from 'yup';
import * as actions from '../../../../store/actions';
import updateObject from '../../../../shared/updateObject';
import MaskedInput, { conformToMask } from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

class BordaForm extends Component {
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
            valor: {
                value: '',
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
            this.props.bordas.forEach(item => {
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
                descricao: yup
                    .string()
                    .required(),
                valor: yup
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
                let bordaData = {
                    descricao: this.state.inputs.descricao.value,
                    valor: masks.valorP6S2Unmask(this.state.inputs.valor.value)
                }

                if (this.props.formAction === 'insert') {
                    this.props.onPostBorda(bordaData)
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
                    this.props.onPutBorda(this.state.inputs.hash_id.value, bordaData)
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
                            <div className={classes.BordaForm}>
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
                                        <Form.Label>Valor</Form.Label>
                                            <MaskedInput
                                                mask={masks.valorP6S2}
                                                guide={false}
                                                type="text"
                                                name="valor"
                                                value={this.state.inputs.valor.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.valor.touched && this.state.inputs.valor.invalid}
                                                render={(ref, props) => (
                                                    <Form.Control ref={ref} {...props} />
                                                )}
                                                />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.valor.error}
                                            </FormControl.Feedback>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className={classes.BordaFormFooter}>
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
        pending: state.borda.borda.api.pending,
        error: state.borda.borda.api.error,
        bordas: state.borda.borda.bordas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPostBorda: (bordaData) => dispatch(actions.postBorda(bordaData)),
        onPutBorda: (bordaId, bordaData) => dispatch(actions.putBorda(bordaId, bordaData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BordaForm);