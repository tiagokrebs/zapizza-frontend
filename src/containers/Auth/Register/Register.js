import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Register.module.css';
import { Form, FormControl, Button, Alert} from 'react-bootstrap';
import ZappSpinner from '../../../components/UI/ZappSpinner/ZappSpinner';
import * as yup from 'yup';
import * as actions from '../../../store/actions';
import updateObject from '../../../shared/updateObject';

class RegisterForm extends Component {
    state = {
        loading: false,
        inputs: {
            email: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
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
            },
            firstName: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
            lastName: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
            terms: {
                value: false,
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
                password: yup
                    .string()
                    .required()
                    .matches(/.{6,120}/, {message: 'A senha deve conter no mínimo 6 caracteres', excludeEmptyString: true}),
                passConf: yup
                    .string()
                    .required()
                    .oneOf([yup.ref('password'), null], 'A senha não confere'),
                firstName: yup
                    .string()
                    .required(),
                lastName: yup
                    .string()
                    .required(),
                terms: yup
                    .mixed()
                    .oneOf([true], 'É necessário aceitar os termos e condições') //workaround para yup.boolean()
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

    registerHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        this.checkFormIsValid()
            .then(() => {
                const registerData = {
                    email: this.state.inputs.email.value,
                    password: this.state.inputs.password.value,
                    firstName: this.state.inputs.firstName.value,
                    lastName: this.state.inputs.lastName.value
                }

                this.props.submitRegister(registerData);
            });        
    }

    render () {
        let form = (
            <Form noValidate onSubmit={this.registerHandler}>
                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={this.state.inputs.email.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.email.touched && this.state.inputs.email.invalid}
                        autoFocus
                        disabled={this.props.register.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.email.error}
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
                        disabled={this.props.register.message}
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
                        disabled={this.props.register.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.passConf.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Form.Label>Primeiro Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={this.state.inputs.firstName.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.firstName.touched && this.state.inputs.firstName.invalid}
                        disabled={this.props.register.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.firstName.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Último Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={this.state.inputs.lastName.value}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler}
                        isInvalid={this.state.inputs.lastName.touched && this.state.inputs.lastName.invalid}
                        disabled={this.props.register.message}
                    />
                    <FormControl.Feedback type="invalid">
                        {this.state.inputs.lastName.error}
                    </FormControl.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                    required
                    name="terms"
                    label="Aceito os termos e condições"
                    onChange={this.inputChangeHandler}
                    onBlur={this.inputBlurHandler}
                    isInvalid={this.state.inputs.terms.touched && this.state.inputs.terms.invalid}
                    feedback={this.state.inputs.terms.error}
                    id="terms"
                    disabled={this.props.register.message}
                    />
                </Form.Group>
                <Button disabled={this.props.register.message} type="submit">Registrar</Button>
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
        if (this.props.register.message) {
            message = (
                <Alert dismissible variant="success">{this.props.register.message}</Alert>
            );
        }

        return (
            <div className={classes.RegisterContent}>
                <div className="container text-center">
                    <div className={classes.RegisterForm}>
                        <h2>Registro</h2>
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
        pending: state.auth.register.api.pending,
        error: state.auth.register.api.error,
        register: state.auth.register
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitRegister: (registerData) => dispatch(actions.register(registerData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);