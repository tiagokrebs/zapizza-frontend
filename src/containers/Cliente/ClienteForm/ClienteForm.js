import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormControl } from 'react-bootstrap';
import ZapSpinner from '../../../components/ZappSpinner/ZappSpinner';
import classes from './ClienteForm.module.css';
import * as yup from 'yup';
import * as actions from '../../../store/actions';
import updateObject from '../../../shared/updateObject';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../shared/inputMasks';
import TelefoneForm from './TelefoneForm/TelefoneForm';
import EnderecoForm from './EnderecoForm/EnderecoForm';

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
            telefones: [],
            enderecos: []
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    addTelefone = () => {
        const novoTelefone = {
            hash_id: {value: '', invalid: false, error: '', touched: true},
            telefone: {value: '', invalid: false, error: '', touched: true},
            tipo: {value: '', invalid: false, error: '', touched: true}
        }
        this.setState({...this.state,
            inputs: {
                ...this.state.inputs,
                telefones: [
                    ...this.state.inputs.telefones,
                    novoTelefone
                ]
        }});
    }

    remTelefone = (event) => {
        const index = event.target.id;
        let telefones = [...this.state.inputs.telefones]
        if (telefones.length > 1) {
            telefones.splice(index,1);
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    telefones: telefones
                }});
        }
    }

    addEndereco = () => {
        const novoEndereco = {
            hash_id: {value: '', invalid: false, error: '', touched: true},
            cep: {value: '', invalid: false, error: '', touched: true},
            logradouro: {value: '', invalid: false, error: '', touched: true},
            numero: {value: '', invalid: false, error: '', touched: true},
            complemento: {value: '', invalid: false, error: '', touched: true},
            bairro: {value: '', invalid: false, error: '', touched: true},
            cidade: {value: '', invalid: false, error: '', touched: true},
            estado: {value: '', invalid: false, error: '', touched: true}
        };
        this.setState({...this.state,
            inputs: {
                ...this.state.inputs,
                enderecos: [
                    ...this.state.inputs.enderecos,
                    novoEndereco
                ]
        }});
    }

    remEndereco = (event) => {
        const index = event.target.id;
        let enderecos = [...this.state.inputs.enderecos]
        if (enderecos.length > 1) {
            enderecos.splice(index,1);
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    enderecos: enderecos
                }});
        }
    }

    componentDidMount () {
        if (this.props.formAction === 'update') {
            // percorre lista de objetos a procura do selecionado
            this.props.clientes.forEach(item => {
                if (item.hash_id === this.props.elementId) {
                    let updatedInputs;
                    let arrayObjects;

                    for (let key in this.state.inputs) {

                        if (Array.isArray(this.state.inputs[key])) {
                            // Define valores dos inputs do formulario para listas de objetos
                            if (item[key].length === 0) {
                                // se array com dados é vazio utiliza objetos vazios
                                if (key === 'telefones') {
                                    arrayObjects = [{
                                        hash_id: {value: '', invalid: false, error: '', touched: true},
                                        telefone: {value: '', invalid: false, error: '', touched: true},
                                        tipo: {value: '', invalid: false, error: '', touched: true}
                                    }];
                                } else if (key === 'enderecos') {
                                    arrayObjects = [{
                                        hash_id: {value: '', invalid: false, error: '', touched: true},
                                        cep: {value: '', invalid: false, error: '', touched: true},
                                        logradouro: {value: '', invalid: false, error: '', touched: true},
                                        numero: {value: '', invalid: false, error: '', touched: true},
                                        complemento: {value: '', invalid: false, error: '', touched: true},
                                        bairro: {value: '', invalid: false, error: '', touched: true},
                                        cidade: {value: '', invalid: false, error: '', touched: true},
                                        estado: {value: '', invalid: false, error: '', touched: true}
                                    }];
                                }
                            } else {
                                arrayObjects = item[key].map((input) => {
                                    let values = {};
                                    // se array com dados existe em store ajusta state de acordo
                                    for (let key in input) {
                                        let v;
                                        if (key === 'telefone'){
                                            let conformMask = conformToMask(input[key].toString(), masks.telefone, {guide: false});
                                            v = conformMask.conformedValue;
                                        } else if (key === 'cep'){
                                            let conformMask = conformToMask(input[key].toString(), masks.cep, {guide: false});
                                            v = conformMask.conformedValue;
                                        } else {
                                            v = input[key].toString();
                                        }
                                        values = {...values,
                                            [key]: {
                                                value: v,
                                                invalid: false,
                                                error: '',
                                                touched: true
                                            }
                                        }
                                    }
                                    return values;
                                });
                            }

                            updatedInputs = updateObject(updatedInputs, {
                                [key]: arrayObjects
                            });

                        } else {
                            // Define valores dos inputs do formulario na raiz de state
                            let v;
                            if (typeof(item[key]) === 'number') {
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
                    }

                    this.setState({inputs: updatedInputs});
                }
            });
        } else {
            // em iserção um endereço e um telefone vazios são inseridos em state
            const tel = {
                hash_id: {value: '', invalid: false, error: '', touched: true},
                telefone: {value: '', invalid: false, error: '', touched: true},
                tipo: {value: '', invalid: false, error: '', touched: true}
            };
            const end = {
                hash_id: {value: '', invalid: false, error: '', touched: true},
                cep: {value: '', invalid: false, error: '', touched: true},
                logradouro: {value: '', invalid: false, error: '', touched: true},
                numero: {value: '', invalid: false, error: '', touched: true},
                complemento: {value: '', invalid: false, error: '', touched: true},
                bairro: {value: '', invalid: false, error: '', touched: true},
                cidade: {value: '', invalid: false, error: '', touched: true},
                estado: {value: '', invalid: false, error: '', touched: true}
            };
            const updatedInputs = updateObject(this.state.inputs, {
                telefones: [tel],
                enderecos: [end]
            })
            this.setState({inputs: updatedInputs});
        }
    }

    inputChangeHandler = (event) => {
        if (["nome"].includes(event.target.name)) {
            // handler para inputs fixos
            const targetValue = event.target.checked ? event.target.checked : event.target.value;

            const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
                value: targetValue
            });

            const updatedinputs = updateObject(this.state.inputs, {
                [event.target.name]: updatedFormElement
            });

            this.setState({inputs: updatedinputs});
        } else if (["telefone", "tipo"].includes(event.target.name)) {
            // handler para inputs dinamicos de telefone
            let telefones = [...this.state.inputs.telefones]
            telefones[event.target.id][event.target.name].value = event.target.value
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    telefones: telefones
            }});
        } else {
            // handler para inputs dinamicos de endereco
            let enderecos = [...this.state.inputs.enderecos]
            enderecos[event.target.id][event.target.name].value = event.target.value
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    enderecos: enderecos
            }});

            // handler especial para pesquisa de CEP
            if (event.target.name === 'cep' && event.target.value.length === 9) {
                const cep = masks.unmaskOnlyNumbers(event.target.value);
                // chamada API ViaCEP
                let targetId = event.target.id;
                this.props.onPesquisaCep(targetId, cep)
                .then((data) => {
                    if (!data.erro){
                        let enderecos = [...this.state.inputs.enderecos]
                        enderecos[data.targetId]['logradouro'].value = data.logradouro;
                        enderecos[data.targetId]['complemento'].value = data.complemento;
                        enderecos[data.targetId]['bairro'].value = data.bairro;
                        enderecos[data.targetId]['cidade'].value = data.localidade;
                        enderecos[data.targetId]['estado'].value = data.uf;
                        this.setState({...this.state,
                            inputs: {
                                ...this.state.inputs,
                                enderecos: enderecos
                        }});
                    } else {
                        let enderecos = [...this.state.inputs.enderecos]
                        enderecos[data.targetId]['logradouro'].value = '';
                        enderecos[data.targetId]['complemento'].value = '';
                        enderecos[data.targetId]['bairro'].value = '';
                        enderecos[data.targetId]['cidade'].value = '';
                        enderecos[data.targetId]['estado'].value = '';
                        this.setState({...this.state,
                            inputs: {
                                ...this.state.inputs,
                                enderecos: enderecos
                        }});
                    }
                });
            }
        }
    }

    inputBlurHandler = (event) => {
        if (["nome"].includes(event.target.name)) {
            // handler para inputs fixos
            const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
                touched: true
            });

            const updatedinputs = updateObject(this.state.inputs, {
                [event.target.name]: updatedFormElement
            });

            this.setState({inputs: updatedinputs});
        } else if (["telefone", "tipo"].includes(event.target.name)) {
            // handler para inputs dinamicos de telefone
            let telefones = [...this.state.inputs.telefones];
            telefones[event.target.id][event.target.name].touched = true;
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    telefones: telefones
            }});
        } else {
            // handler para inputs dinamicos de endereco
            let enderecos = [...this.state.inputs.enderecos];
            enderecos[event.target.id][event.target.name].touched = true;
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    enderecos: enderecos
            }});
        }
    }

    checkFormIsValid = () => {
        // Retorna Promise para validacao e ajuste de state
        return new Promise((resolve, reject) => {
            // Define dicionario
            yup.setLocale({
                mixed: {
                    default: 'Campo inválido',
                    required: 'Campo obrigatório',
                    notType: 'Campo inválido'
                }
            });

            // Cria schema telefone de validação
            const schemaTelefone = yup.object().shape({
                telefone: yup
                    .string()
                    .min(14, 'Telefone inválido')
                    .required(),
                tipo: yup
                    .string()
                    .required()
            });

            // Cria schema endereco de validação
            const schemaEndereco = yup.object().shape({
                cep: yup
                    .string()
                    .min(9, 'CEP inválido')
                    .required(),
                logradouro: yup
                    .string()
                    .required(),
                numero: yup
                    .string(),
                complemento: yup
                    .string(),
                bairro: yup
                    .string()
                    .required(),
                cidade: yup
                    .string()
                    .required(),
                estado: yup
                    .string()
                    .required()
            });

            // Cria schemaCliente de validacao
            const schemaCliente = yup.object().shape({
                nome: yup
                    .string()
                    .min(3, 'Mínimo 3 caracteres')
                    .max(120, 'Máximo 120 caracteres')
                    .required(),
                telefones: yup.array().of(schemaTelefone),
                enderecos: yup.array().of(schemaEndereco)
            });

            // Cria objeto com base em state para validacao
            let formValues = {};
            for (let key in this.state.inputs) {
                if (Array.isArray(this.state.inputs[key])) {
                    const arrayObjects = this.state.inputs[key].map((item) => {
                        let values = {};
                        // montar objeto interno para repor sobre telefones: []
                        for (let key in item) {
                            values[key] = item[key].value.toString();
                        }
                        return values;
                    });
                    formValues[key] = arrayObjects;
                } else {
                    formValues[key] = this.state.inputs[key].value.toString();
                }
            }

            // Reinicia validade dos inputs do formulario
            let updatedInputs = this.state.inputs;
            for (let key in this.state.inputs) {
                if (Array.isArray(this.state.inputs[key])) {
                    const arrayObjects2 = this.state.inputs[key].map((item) => {
                        // montar objeto interno para repor sobre telefones: []
                        for (let key2 in item) {
                            item[key2].touched = false
                            item[key2].invalid = false;
                            item[key2].error = null;
                        }
                        return item
                    });
                    updatedInputs = updateObject(updatedInputs, {
                        [key]: arrayObjects2
                    });
                } else {
                    const updatedFormElement = updateObject(this.state.inputs[key], {
                        touched: false,
                        invalid: false,
                        error: null
                    });

                    updatedInputs = updateObject(updatedInputs, {
                        [key]: updatedFormElement
                    });
                }
            }
            this.setState({inputs: updatedInputs});

            // Valida e define retorno dos erros em state
            schemaCliente.validate(formValues, {abortEarly: false})
            .catch(error => {
                error.inner.forEach(formElement => {
                    let updatedinputs = {};
                    let updatedFormElement = {};
                    let arrayObjects = [];
                    const arrayPath = formElement.path.match(/[^\][.]+/g);
                    let key = arrayPath[0];
                    let index = parseInt(arrayPath[1]);
                    let field = arrayPath[2];

                    if (key != null && index != null && field != null) {
                        // define erros em array de objetos do state
                        arrayObjects = this.state.inputs[key].map((item, idx) => {
                            if (idx === index) {
                                for (let key2 in item) {
                                    if (key2 === field) {
                                        item[key2].touched = true;
                                        item[key2].invalid = true;
                                        item[key2].error = formElement.message;
                                    }
                                }
                                return item
                            }
                            return item;
                        });

                        updatedinputs = updateObject(this.state.inputs, {
                            [key]: arrayObjects
                        });

                    } else {
                        // define erros em atributos na raiz do state
                        updatedFormElement = updateObject(this.state.inputs[formElement.path], {
                            touched: true,
                            invalid: true,
                            error: formElement.message
                        });

                        updatedinputs = updateObject(this.state.inputs, {
                            [formElement.path]: updatedFormElement
                        });
                    }
                    this.setState({inputs: updatedinputs});
                });
            });

            // Define validade geral do formulario
            schemaCliente.isValid(formValues)
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
                // Cria objeto com base em state para validacao
                let clienteData = {};
                for (let key in this.state.inputs) {
                    if (key !== 'hash_id') {
                        if (Array.isArray(this.state.inputs[key])) {
                            const arrayObjects = this.state.inputs[key].map((item) => {
                                let values = {};
                                // montar objeto interno para repor sobre telefones: []
                                let v;
                                for (let key in item) {
                                    if (["telefone", "cep"].includes(key)) {
                                        const vMask = item[key].value.toString();
                                        v = masks.unmaskOnlyNumbers(vMask);
                                    } else {
                                        v = item[key].value.toString();
                                    }
                                    values[key] = v;
                                }
                                return values;
                            });
                            clienteData[key] = arrayObjects;
                        } else {
                            clienteData[key] = this.state.inputs[key].value.toString();
                        }
                    }
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
                            if ((Array.isArray(error.message))) {
                                const updatedFormElement = updateObject(this.state.inputs[error.field], {
                                    touched: true,
                                    invalid: true,
                                    error: error.message[0]
                                });

                                updatedInputs = updateObject(updatedInputs, {
                                    [error.field]: updatedFormElement
                                });
                            } else {
                                const message = error.message;
                                for (let msgIndex in message) {
                                    const fields = message[msgIndex];
                                    for (let key in fields) {
                                        const updatedFormElement = updateObject(this.state.inputs[error.field][msgIndex][key], {
                                            touched: true,
                                            invalid: true,
                                            error: message[msgIndex][key][0]
                                        });

                                        let arrayObject = [...this.state.inputs[error.field]];
                                        arrayObject[msgIndex][key] = updatedFormElement;
                                        updatedInputs = updateObject(updatedInputs, {
                                            [error.field]: arrayObject
                                        });
                                    }
                                }
                            }
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
                            if ((Array.isArray(error.message))) {
                                const updatedFormElement = updateObject(this.state.inputs[error.field], {
                                    touched: true,
                                    invalid: true,
                                    error: error.message[0]
                                });

                                updatedInputs = updateObject(updatedInputs, {
                                    [error.field]: updatedFormElement
                                });
                            } else {
                                const message = error.message;
                                for (let msgIndex in message) {
                                    const fields = message[msgIndex];
                                    for (let key in fields) {
                                        const updatedFormElement = updateObject(this.state.inputs[error.field][msgIndex][key], {
                                            touched: true,
                                            invalid: true,
                                            error: message[msgIndex][key][0]
                                        });

                                        let arrayObject = [...this.state.inputs[error.field]];
                                        arrayObject[msgIndex][key] = updatedFormElement;
                                        updatedInputs = updateObject(updatedInputs, {
                                            [error.field]: arrayObject
                                        });
                                    }
                                }
                            }
                        });
                        this.setState({inputs: updatedInputs});
                        this.setState({ loading: false });
                    });
                }
            });
    }

    render () {
        let {enderecos} = this.state.inputs
        let {telefones} = this.state.inputs
        let form = (
            <Form noValidate onSubmit={this.submitHandler} className={classes.ClienteForm}>
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
                                <hr/>
                                <TelefoneForm telefones={telefones}
                                    inputChangeHandler={this.inputChangeHandler}
                                    inputBlurHandler={this.inputBlurHandler}
                                    addTelefone={this.addTelefone}
                                    remTelefone={this.remTelefone}
                                />
                                <hr/>
                                {
                                  enderecos.map((endereco, index) => {
                                      return (
                                        <div key={index} id={`Endereco${index}`}>
                                            <div style={{textAlign: 'center', display: 'flex'}}>
                                                <span>Endereço #{index+1}</span>
                                                <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={this.addEndereco}></i></span>
                                                <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={this.remEndereco} id={index}></i></span>
                                            </div>
                                            <EnderecoForm
                                                endereco={endereco}
                                                index={index}
                                                inputChangeHandler={this.inputChangeHandler}
                                                inputBlurHandler={this.inputBlurHandler}
                                                size="md"
                                            />
                                        </div>
                                      )
                                  })
                                }
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
        onPutCliente: (clienteId, clienteData) => dispatch(actions.putCliente(clienteId, clienteData)),
        onPesquisaCep: (targetId, cep) => dispatch(actions.pesquisaCep(targetId, cep))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
