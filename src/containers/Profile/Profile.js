import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import { Form, FormControl, Button, Alert} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import ZappSpinner from '../../components/UI/ZappSpinner/ZappSpinner';
import PageTitle from '../../components/Page/PageTitle/PageTitle';
import * as yup from 'yup';
import * as actions from '../../store/actions';
import updateObject from '../../shared/updateObject';

class Profile extends Component {
    state = {
        loading: false,
        inputs: {
            email: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            username: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            firstName: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
            lastName: {
                value: '',
                invalid: false,
                error: '',
                touched: true
            },
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    componentDidMount () {
        this.props.getProfile(this.props.user.userId)
            .then((response) => {            
                // define valor dos inputs do formulario em state
                let updatedInputs = this.state.inputs;
                for (let key in this.state.inputs) {
                    const updatedFormElement = updateObject(this.state.inputs[key], {
                        value: response.data.data[[key]]
                    });

                    updatedInputs = updateObject(updatedInputs, {
                        [key]: updatedFormElement
                    });
                }
                this.setState({inputs: updatedInputs});
            });
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
                username: yup
                    .string()
                    .required()
                    .matches(/.{3,120}/, {message: 'O username deve conter no mínimo 3 caracteres', excludeEmptyString: true}),
                firstName: yup
                    .string()
                    .required(),
                lastName: yup
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

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        this.checkFormIsValid()
            .then(() => {
                const profileData = {
                    email: this.state.inputs.email.value,
                    username: this.state.inputs.username.value,
                    firstName: this.state.inputs.firstName.value,
                    lastName: this.state.inputs.lastName.value
                }

                this.props.postProfile(this.props.user.userId, profileData)
                    .then((response) => {
                        this.setState({formSubmitSuceed: true});
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
                    });
            });        
    }

    render () {
        let form = (
            <Form noValidate onSubmit={this.submitHandler}>
                
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Informe seus dados pessoais</h6>
                </div>

                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className={classes.ProfileForm}>
                                <Form.Group className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={this.state.inputs.email.value}
                                            onChange={this.inputChangeHandler}
                                            onBlur={this.inputBlurHandler}
                                            isInvalid={this.state.inputs.email.touched && this.state.inputs.email.invalid}
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {this.state.inputs.email.error}
                                        </FormControl.Feedback>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={this.state.inputs.username.value}
                                                onChange={this.inputChangeHandler}
                                                onBlur={this.inputBlurHandler}
                                                isInvalid={this.state.inputs.username.touched && this.state.inputs.username.invalid}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {this.state.inputs.username.error}
                                            </FormControl.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <Form.Label>Primeiro Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={this.state.inputs.firstName.value}
                                            onChange={this.inputChangeHandler}
                                            onBlur={this.inputBlurHandler}
                                            isInvalid={this.state.inputs.firstName.touched && this.state.inputs.firstName.invalid}
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {this.state.inputs.firstName.error}
                                        </FormControl.Feedback>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <Form.Label>Último Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={this.state.inputs.lastName.value}
                                            onChange={this.inputChangeHandler}
                                            onBlur={this.inputBlurHandler}
                                            isInvalid={this.state.inputs.lastName.touched && this.state.inputs.lastName.invalid}
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {this.state.inputs.lastName.error}
                                        </FormControl.Feedback>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`card-footer ${classes.CardFooter}`}>
                    <Link to="/">
                        <Button variant="secondary" >Cancelar</Button>
                    </Link>
                    <Button 
                        variant="success" 
                        type="submit" 
                        name="form.submitted"
                        className="pull-right">Gravar</Button>
                </div>
            </Form>
        );

        if (this.props.pending) {
            form = <ZappSpinner />
        }

        let message = null;
        if (this.props.error) {
            if (this.props.error.errors) {

            }
            message = (
                <Alert dismissible variant="danger">{this.props.error.message}</Alert>
            );
        } 

        let formRedirect;
        if (this.state.formSubmitSuceed) {
            formRedirect = <Redirect to="/" />;
        }

        let pageTitle = <PageTitle title={'Meu Perfil'} subtitle='Identifique-se'/>

        if (!this.props.isAuthenticated) {
            pageTitle = null;
        }

        let pageContent = (
            <div className="row">
                {formRedirect}
                <div className="col-sm-12">
                    <div className={`card ${classes.Card}`}>
                        {message}
                        {form}
                    </div>
                </div>
            </div>
        );

        if (!this.props.isAuthenticated) {
            pageContent = null;
        }

        return (
            <div>
                {pageTitle}
                {pageContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user,
        pending: state.user.profile.api.pending,
        error: state.user.profile.api.error,
        profile: state.user.profile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (username) => dispatch(actions.getProfile(username)),
        postProfile: (username, profileData) => dispatch(actions.postProfile(username, profileData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);