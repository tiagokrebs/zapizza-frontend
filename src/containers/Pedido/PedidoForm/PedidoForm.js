import React, { Component } from 'react';
import { connect } from 'react-redux';

// import classes from './PedidoForm.module.css';
import VerticalStepper from '../../../components/UI/VerticalStepper/VerticalStepper';
import PesquisaCliente from './PesquisaCliente/PesquisaCliente';
import updateObject from '../../../shared/updateObject';
import * as actions from '../../../store/actions/';

class PedidoForm extends Component {
    steps = ['Cliente', 'Pizzas', 'Adicionais', 'Entrega', 'Pagamento'];

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

    render () {
        const stepsContent = [
            <PesquisaCliente 
                cliente={this.state.inputs.cliente}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                asyncSelectClientes={this.props.onSelectClientes}
                getClienteData={this.props.onGetCliente}
            />,
            'Adição de Pizza',
            'Escolha dos adicionais',
            'Opção de entrega ou retira',
            'Forma de pagamento'
        ];

        return (
            <VerticalStepper
                steps={this.steps}
                stepsContent={stepsContent} />
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
