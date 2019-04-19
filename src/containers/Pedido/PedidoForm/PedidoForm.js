import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

// import classes from './PedidoForm.module.css';
import VerticalStepper from '../../../components/UI/VerticalStepper/VerticalStepper';
import PesquisaCliente from './PesquisaCliente/PesquisaCliente';
import updateObject from '../../../shared/updateObject';
import * as actions from '../../../store/actions/';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../shared/inputMasks';

class PedidoForm extends Component {
    state = {
        loading: false,
        inputs: {
            cliente: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            }
        },
        selectedClienteData: {
            nome: '',
            telefone: '',
            endereco: ''
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    inputChangeHandler = (event) => {
        if (["cliente"].includes(event.target.name)) {
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
        }
    }

    inputBlurHandler = (event) => {
        if (["cliente"].includes(event.target.name)) {
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

    getClienteData = (hashId) => {
        this.props.onGetCliente(hashId)
            .then(response => {
                const cliente = response.data.data.cliente;
                let telefone = 'Não informado';
                if (cliente.telefones.length > 0) {
                    let conformMask = conformToMask(cliente.telefones[0].telefone, masks.telefone, {guide: false});
                    telefone = conformMask.conformedValue;
                }

                let endereco = 'Não informado';
                if (cliente.enderecos.length > 0) {
                    const end = cliente.enderecos[0];
                    endereco = end.logradouro + 
                        (end.numero ? ', ' + end.numero : '') +
                        (end.complemento ? ', ' + end.complemento : '') +
                        (end.bairro ? ', ' + end.bairro : '') +
                        (end.cidade ? ', ' + end.cidade : '')
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        cliente: {
                            ...this.state.inputs.cliente,
                            invalid: false,
                            error: ''
                        }
                    },
                    selectedClienteData: {
                        nome: cliente.nome,
                        telefone: telefone,
                        endereco: endereco
                    },
                });
            })
    }

    checkFormClienteIsValid = () => {
        if (this.state.inputs.cliente.value) {
            return true
        }
        this.setState({
            inputs: {
                ...this.state.inputs,
                cliente: {
                    ...this.state.inputs.cliente,
                    invalid: true,
                    error: 'Campo obrigatório'
                }
            }
        });
        return false;
    }

    render () {
        /**
         * Hmm... as variaveis criadas para o stepper precisam seguir a mesma orderm em todos os arrays
         * todo: criar um array de objetos contendo as propriedades a seguir
         * todo: ajustar componente VerticalStepper para receber o novo array de objetos
         */
        const steps = ['Cliente', 'Pizzas', 'Adicionais', 'Entrega', 'Pagamento'];
        const stepsContent = [
            <PesquisaCliente 
                cliente={this.state.inputs.cliente}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                asyncSelectClientes={this.props.onSelectClientes}
                getClienteData={this.getClienteData}
                selectedClienteData={this.state.selectedClienteData}
                formIsValid={this.checkFormClienteIsValid}
            />,
            'Adição de Pizza',
            'Escolha dos adicionais',
            'Opção de entrega ou retira',
            'Forma de pagamento'
        ];
        const stepsValidation = [
            this.checkFormClienteIsValid,
            () => {console.log('Função de validação passo 1'); return true;},
            () => {console.log('Função de validação passo 2'); return true;},
            () => {console.log('Função de validação passo 3'); return true;},
            () => {console.log('Função de validação passo 4'); return true;},
        ];
        const optionalSteps = [2];

        return (
            <Form noValidate>
                <VerticalStepper
                    steps={steps}
                    stepsContent={stepsContent}
                    stepsValidation={stepsValidation}
                    optionalSteps={optionalSteps}/>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectClientes: (nome, telefone) => dispatch(actions.selectCliente(nome, telefone)),
        onGetCliente: (hashId) => dispatch(actions.getCliente(hashId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoForm);
