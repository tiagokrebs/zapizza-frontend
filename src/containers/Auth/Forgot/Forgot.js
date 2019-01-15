import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Forgot.module.css';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import ZappSpinner from '../../../components/UI/ZappSpinner/ZappSpinner';
import * as yup from 'yup';
import * as actions from '../../../store/actions';
import updateObject from '../../../shared/updateObject';


class Forgot extends Component {
    state = {
        inputs: {
            email: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            }
        },
        formIsValid: false
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
                required: 'Campo obrigatório'
                },
                string: {
                    email: 'E-mail inválido'
                }
            });

            // Cria schema de validacao
            const schema = yup.object().shape({
                email: yup
                    .string()
                    .required()
                    .email(),
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
                }
            });
        });
    };

    forgotHandler = (event) => {
        event.preventDefault();
        this.checkFormIsValid()
            .then(() => {
                const forgotData = {
                    email: this.state.inputs.email.value
                }

                this.props.submitForgot(forgotData);
            });
    }

    render () {
        let form = (
            <Form noValidate onSubmit={this.forgotHandler}>
                <Form.Group controlId="username">
                    <Form.Control
                        type="email"
                        name="email"
                        value={this.state.inputs.email.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.email.touched && this.state.inputs.email.invalid}
                        autoFocus
                        disabled={this.props.forgot.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.email.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Button type="submit" disabled={this.props.forgot.message}>Enviar</Button>
            </Form>
        );

        if (this.props.pending) {
            form = <ZappSpinner />
        }

        let message = null;
        if (this.props.error) {
            message = (
                <Alert dismissible variant="danger">{this.props.error.message}</Alert>
            );
        }
        if (this.props.forgot.message) {
            message = (
                <Alert dismissible variant="success">{this.props.forgot.message}</Alert>
            );
        }

        return (
            <div className={classes.ForgotContent}>
                <div className="container text-center">
                    <div className={classes.ForgotForm}>
                        <h2>Esqueci a senha</h2>
                        {message}
                        {form}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pending: state.auth.forgot.api.pending,
        error: state.auth.forgot.api.error,
        forgot: state.auth.forgot
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForgot: (forgotData) => dispatch(actions.forgot(forgotData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);