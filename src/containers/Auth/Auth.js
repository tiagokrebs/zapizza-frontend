import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.module.css';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import ZappSpinner from '../../components/ZappSpinner/ZappSpinner';
import * as yup from 'yup';
import * as actions from '../../store/actions';
import updateObject from '../../shared/updateObject';


class Auth extends Component {
    state = {
        inputs: {
            username: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
            password: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
        },
        formIsValid: false
    }

    componentDidMount () {
        if (this.props.location.state) {
            this.props.onSetAuthRedirectPath(this.props.location.state.from.pathname);
        } else {
            this.props.onSetAuthRedirectPath("/");
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
                required: 'Campo obrigatório'
                }
            });

            // Cria schema de validacao
            const schema = yup.object().shape({
                username: yup
                    .string()
                    .required(),
                password: yup
                    .string()
                    .required()
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

    loginHandler = (event) => {
        event.preventDefault();
        this.checkFormIsValid()
            .then(() => {
                const loginData = {
                    username: this.state.inputs.username.value,
                    password: this.state.inputs.password.value
                }

                this.props.submitLogin(loginData);
            });
    }

    render () {
        let form = (
            <Form noValidate onSubmit={this.loginHandler}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={this.state.inputs.username.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.username.touched && this.state.inputs.username.invalid}
                        autoFocus
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.username.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={this.state.inputs.password.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.password.touched && this.state.inputs.password.invalid}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.password.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Button type="submit">Entrar</Button>
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

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.LoginContent}>
                {authRedirect}
                <div className="container text-center">
                    <div className={classes.LoginForm}>
                        <h2>Login</h2>
                        {message}
                        {form}
                    </div>
                    <Link to="/forgot">
                        <small>Esqueci a senha</small>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pending: state.auth.api.pending,
        error: state.auth.api.error,
        isAuthenticated: state.auth.isAuthenticated,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        submitLogin: (loginData) => dispatch(actions.login(loginData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);