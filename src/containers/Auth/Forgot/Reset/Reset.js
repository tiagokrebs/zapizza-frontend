import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Reset.module.css';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ZappSpinner from '../../../../components/UI/ZappSpinner/ZappSpinner';
import * as yup from 'yup';
import * as actions from '../../../../store/actions';
import updateObject from '../../../../shared/updateObject';


class Reset extends Component {
    state = {
        inputs: {
            password: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
            passConf: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            }
        },
        formIsValid: false,
        token: null
    }

    componentDidMount () {
        const token = this.props.match.params.token;
        this.setState({token: token});
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
                }
            });

            // Cria schema de validacao
            const schema = yup.object().shape({
                password: yup
                    .string()
                    .required()
                    .matches(/.{6,120}/, {message: 'A senha deve conter no mínimo 6 caracteres', excludeEmptyString: true}),
                passConf: yup
                    .string()
                    .required()
                    .oneOf([yup.ref('password'), null], 'A senha não confere')
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

    resetHandler = (event) => {
        event.preventDefault();
        this.checkFormIsValid()
            .then(() => {
                const resetData = {
                    token: this.state.token,
                    password: this.state.inputs.password.value
                }

                this.props.submitReset(resetData);
            });
    }

    render () {
        let form = (
            <Form noValidate onSubmit={this.resetHandler}>
                <Form.Group controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={this.state.inputs.password.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.password.touched && this.state.inputs.password.invalid}
                        disabled={this.props.reset.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.password.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Form.Group controlId="passConf">
                    <Form.Label>Confirmar</Form.Label>
                    <Form.Control
                        type="password"
                        name="passConf"
                        value={this.state.inputs.passConf.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.passConf.touched && this.state.inputs.passConf.invalid}
                        disabled={this.props.reset.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.passConf.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Button type="submit">Enviar</Button>
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

        let resetRedirect = null;
        if (this.props.reset.message) {
            resetRedirect = <Redirect to="/login"/>
        }

        return (
            <div className={classes.ResetContent}>
                {resetRedirect}
                <div className="container text-center">
                    <div className={classes.ResetForm}>
                        <h2>Redefinir Senha</h2>
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
        pending: state.auth.reset.api.pending,
        error: state.auth.reset.api.error,
        reset: state.auth.reset
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitReset: (resetData) => dispatch(actions.reset(resetData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);