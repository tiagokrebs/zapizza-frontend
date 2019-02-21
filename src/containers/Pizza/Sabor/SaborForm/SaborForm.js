import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormControl } from 'react-bootstrap';
import ZapSpinner from '../../../../components/ZappSpinner/ZappSpinner';
import classes from './SaborForm.module.css';
import * as yup from 'yup';
import * as actions from '../../../../store/actions';
import updateObject from '../../../../shared/updateObject';
import MaskedInput from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

class SaborForm extends Component {
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
            // novos inputs são inseridos em componentDidMount de acordo com cadastro de Tamanhos
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    componentDidMount () {
        // obtem lista de tamanhos e transforma em state para montagem do form
        let updatedInputs = {...this.state.inputs}
        this.props.tamanhos.forEach(tamanho => {
            if (tamanho.ativo) {
                // const key = [tamanho.descricao].toString().toLowerCase().replace(/[^a-z]/g, "");
                const key = [tamanho.hash_id];
                updatedInputs = updateObject(updatedInputs, {
                    [key]: {
                        value: '',
                        invalid: false,
                        error: '',
                        touched: true,
                        dynamic: true,
                        label: tamanho.descricao
                    }
                });
            }
        })

        if (this.props.formAction === 'update') {
            // percorre lista de objetos a procura do selecionado
            this.props.sabores.forEach(sabor => {
                if (sabor.hash_id === this.props.elementId) {
                    // Define valores dos inputs do formulario
                    for (let key in updatedInputs) {
                        let updatedFormElement;
                        if (updatedInputs[key].dynamic) {
                            // Define valores dos inputs dinamicos do formulário
                            // eslint-disable-line no-loop-func
                            sabor.tamanhos.forEach(tamanho => {
                                // Percorre lista de tamanhos do sabor
                                if (tamanho.hash_id === key) {
                                    updatedFormElement = updateObject(updatedInputs[key], {
                                        value: tamanho.valor
                                    });
                                    
                                    updatedInputs = updateObject(updatedInputs, {
                                        [key]: updatedFormElement
                                    });
                                }
                            })
                        } else {
                            // Define valores dos iputs fixos do formulário
                            updatedFormElement = updateObject(updatedInputs[key], {
                                value: sabor[key]
                            });

                            updatedInputs = updateObject(updatedInputs, {
                                [key]: updatedFormElement
                            });
                        }

                        
                    }
                    this.setState({inputs: updatedInputs});
                }
            });
        } else {
            // quando não é update apenas retorna novo state com inputs dinamicos adicionados
            this.setState({inputs: updatedInputs});
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

            // Cria schema de validacao fixo
            let schemaObject = {
                descricao: yup.string().required()
            };
            for (let key in this.state.inputs) {
                if (this.state.inputs[key].dynamic) {
                    schemaObject[key] = yup.string().required();
                }
            }
            const schema = yup.object().shape(schemaObject);

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
            // schema.validate(formValues, {abortEarly: false})
            schema.validate(formValues, {abortEarly: false, strict: true })
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


                // todo: ajustar json do PUT para API de acordo com exemplo Postman


                // define o atributos do formulário de post/put
                let saborData = {
                    descricao: this.state.inputs.descricao.value,
                    tamanhos: []
                };
                let dinamicInputs = [];
                for (let key in this.state.inputs) {
                    if (this.state.inputs[key].dynamic) {
                        // saborData[key] = masks.valorP6S2Unmask(this.state.inputs[key].value)
                        dinamicInputs.push({
                            hash_id: key, 
                            valor: masks.valorP6S2Unmask(this.state.inputs[key].value)
                        })
                    }
                };
                saborData = updateObject(saborData, {tamanhos: dinamicInputs});

                if (this.props.formAction === 'insert') {
                    this.props.onPostSabor(saborData)
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
                    this.props.onPutSabor(this.state.inputs.hash_id.value, saborData)
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
                            <div className={classes.SaborForm}>
                                <Form.Group className="row">
                                    <div className="col-lg-12 col-md-12">
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
                                </Form.Group>
                                <Form.Group className="row">
                                    {
                                        Object.keys(this.state.inputs).map((item, index) => {
                                            if (this.state.inputs[item].dynamic) {
                                                return (
                                                    <div key={[item]} className="col-lg-4 col-md-4">
                                                        <Form.Label>{`Valor ${this.state.inputs[item].label}`}</Form.Label>
                                                        <MaskedInput
                                                            mask={masks.valorP6S2}
                                                            guide={false}
                                                            type="text"
                                                            name={[item]}
                                                            value={this.state.inputs[item].value}
                                                            onChange={this.inputChangeHandler}
                                                            onBlur={this.inputBlurHandler}
                                                            isInvalid={this.state.inputs[item].touched && this.state.inputs[item].invalid}
                                                            render={(ref, props) => (
                                                                <Form.Control ref={ref} {...props} />
                                                            )}
                                                            />
                                                        <FormControl.Feedback type="invalid">
                                                            {this.state.inputs[item].error}
                                                        </FormControl.Feedback>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                    }
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className={classes.SaborFormFooter}>
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
        pending: state.sabor.sabor.api.pending,
        error: state.sabor.sabor.api.error,
        sabores: state.sabor.sabor.sabores,
        tamanhos: state.tamanho.tamanho.tamanhos
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPostSabor: (saborData) => dispatch(actions.postSabor(saborData)),
        onPutSabor: (saborId, saborData) => dispatch(actions.putSabor(saborId, saborData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaborForm);