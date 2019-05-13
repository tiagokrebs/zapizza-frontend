import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';
// import classes from './PedidoForm.module.css';
import updateObject from '../../../shared/updateObject';
import * as actions from '../../../store/actions/';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../shared/inputMasks';
import VerticalStepper from '../../../components/UI/VerticalStepper/VerticalStepper';
import PassoCliente from './PassoCliente/PassoCliente';
import PassoPizzas from './PassoPizzas/PassoPizzas';
import PassoAdicionais from './PassoAdicionais/PassoAdicionais';
import PassoEntrega from './PassoEntrega/PassoEntrega';
import * as yup from 'yup';
import { yupLocale, inputsToValidation, inputsRestartValidity, inputsDefineErrors } from '../../../shared/yupHelpers';

class PedidoForm extends Component {
    state = {
        loading: false,
        inputs: {
            cliente: {
                value: '',
                invalid: false,
                error: '',
                touched: false
            },
            pizzas: [
                {
                    tamanho: {
                        value: '',
                        invalid: false,
                        error: '',
                        touched: false
                    },
                    sabores: {
                        value: [],
                        invalid: false,
                        error: '',
                        touched: false
                    },
                    bordas: {
                        value: [],
                        invalid: false,
                        error: '',
                        touched: false
                    }
                }
            ],
            adicionais: {
                value: [],
                invalid: false,
                error: '',
                touched: false
            },
            tipoEntrega: {
              value: 'E',
              invalid: false,
              error: '',
              touched: true
            },
            enderecoEntrega: {
              value: '',
              invalid: false,
              error: '',
              touched: true
            },
            novoEndereco: {
              cep: {value: '', invalid: false, error: '', touched: true},
              logradouro: {value: '', invalid: false, error: '', touched: true},
              numero: {value: '', invalid: false, error: '', touched: true},
              complemento: {value: '', invalid: false, error: '', touched: true},
              bairro: {value: '', invalid: false, error: '', touched: true},
              cidade: {value: '', invalid: false, error: '', touched: true},
              estado: {value: '', invalid: false, error: '', touched: true}
            },
            obsEntrega: {
              value: '',
              invalid: false,
              error: '',
              touched: false
            },
            valorEntrega: {
              value: '',
              invalid: false,
              error: '',
              touched: false
            }
        },
        selectedClienteData: {
            nome: '',
            telefone: '',
            endereco: '', // endereço primário para exibição no card de seleção
            enderecos: [] // outros endereços para escolha no PassoEntrega
        },
        formIsValid: false,
        formSubmitSuceed: false
    }

    addPizza = () => {
        const novaPizza = {
            tamanho: {value: '', invalid: false, error: '', touched: false},
            sabores: {value: [], invalid: false, error: '', touched: false},
            bordas: {value: [], invalid: false, error: '', touched: false}
        }
        this.setState({...this.state,
            inputs: {
                ...this.state.inputs,
                pizzas: [
                    ...this.state.inputs.pizzas,
                    novaPizza
                ]
        }});
    }

    remPizza = (event) => {
        const index = event.target.id;
        let pizzas = [...this.state.inputs.pizzas]
        if (pizzas.length > 1) {
            pizzas.splice(index,1);
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    pizzas: pizzas
                }});
        }
    }

    addAdicional = (adicional) => {
      this.setState({
        inputs: {
          ...this.state.inputs,
          adicionais: {
            ...this.state.inputs.adicionais,
            value: [
              ...this.state.inputs.adicionais.value,
              adicional
            ]
          }
        }
      });
    }

    remAdicional = (value) => {
      this.setState({
        inputs: {
          ...this.state.inputs,
          adicionais: {
            ...this.state.inputs.adicionais,
            value: [
              ...this.state.inputs.adicionais.value.filter((adicional) => {
                if (adicional.value === value) {
                  return false;
                }
                return true;
              })
            ]
          }
        }
      });
    }

    componentDidMount() {
        this.props.onGetTamanhos();
        this.props.onGetSabores();
        this.props.onGetBordas();
        this.props.onGetAdicionais();
    }

    inputChangeHandler = (event) => {
        if (["adicionais", "tipoEntrega", "obsEntrega", "valorEntrega", "enderecoEntrega"].includes(event.target.name)) {
            // handler para inputs fixos
            const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
                value: event.target.value,
            });

            const updatedinputs = updateObject(this.state.inputs, {
                [event.target.name]: updatedFormElement
            });

            this.setState({inputs: updatedinputs});
        } else if (["tamanho", "sabores", "bordas"].includes(event.target.name)) {
            // handler para inputs dinamicos de telefone
            let pizzas = [...this.state.inputs.pizzas]
            pizzas[event.target.id][event.target.name].value = event.target.value
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    pizzas: pizzas
            }});
        } else {
            // handler para inputs dinamicos de endereco
            // let enderecos = [...this.state.inputs.enderecos]
            // enderecos[event.target.id][event.target.name].value = event.target.value
            // this.setState({...this.state,
            //     inputs: {
            //         ...this.state.inputs,
            //         enderecos: enderecos
            // }});
        }
    }

    inputBlurHandler = (event) => {
        if (["cliente", "adicionais", "tipoEntrega", "obsEntrega", "valorEntrega", "enderecoEntrega"].includes(event.target.name)) {
            // handler para inputs fixos
            const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
                touched: true
            });

            const updatedinputs = updateObject(this.state.inputs, {
                [event.target.name]: updatedFormElement
            });

            this.setState({inputs: updatedinputs});
        } else if (["tamanho", "sabores", "bordas"].includes(event.target.name)) {
            // handler para inputs dinamicos de telefone
            let pizzas = [...this.state.inputs.pizzas];
            pizzas[event.target.id][event.target.name].touched = true;
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    pizzas: pizzas
            }});
        } else {
            // handler para inputs dinamicos de endereco
            // let enderecos = [...this.state.inputs.enderecos];
            // enderecos[event.target.id][event.target.name].touched = true;
            // this.setState({...this.state,
            //     inputs: {
            //         ...this.state.inputs,
            //         enderecos: enderecos
            // }});
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
                let endEntr = '';
                if (cliente.enderecos.length > 0) {
                    const end = cliente.enderecos[0];
                    endereco = end.logradouro +
                        (end.numero ? ', ' + end.numero : '') +
                        (end.complemento ? ', ' + end.complemento : '') +
                        (end.bairro ? ', ' + end.bairro : '') +
                        (end.cidade ? ', ' + end.cidade : '');
                    endEntr = end.hash_id;
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        cliente: {
                            ...this.state.inputs.cliente,
                            value: cliente.hash_id,
                            invalid: false,
                            error: '',
                        },
                        enderecoEntrega: {
                          ...this.state.inputs.enderecoEntrega,
                          value: endEntr
                        }
                    },
                    selectedClienteData: {
                        nome: cliente.nome,
                        telefone: telefone,
                        endereco: endereco,
                        enderecos: cliente.enderecos
                    }
                });
            })
    }

    checkFormIsValid = (passo) => {
        /**
         * Validação parcial ou total do formulário de acordo com parâmetro
         * Utiliza yup para validação com schemas e funções genéricas para
         * atualização de state
         * Promisse é retornada para garantia de sincronia com as alterações de state
         */
        return new Promise((resolve, reject) => {
            console.log('função de validação geral passo: ' + passo);

            // define dicionário para mensagens yup
            yup.setLocale(yupLocale);

            // schema genérico para componetes select
            const selectSchema = yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            });

            // cria schema com base em passo
            let schema;
            if (passo === 0) {
              // PassoCliente
                schema = yup.object().shape({
                    cliente: yup.string().required()
                });
            } else if (passo === 1) {
              // PassoPizzas
                const schemaPizza = yup.object().shape({
                    tamanho: yup.string().required(),
                    sabores: yup
                      .array().of(selectSchema).required(),
                    bordas: yup
                      .array().of(selectSchema)
                });

                schema = yup.object().shape({
                    pizzas: yup.array().of(schemaPizza)
                });
            } else if (passo === 2) {
              // PassoAdicionais
              schema = yup.object().shape({
                  adicionais: yup.array().of(selectSchema)
              });
            } else if (passo === 3) {
              // PassoEntrega
              schema = yup.object().shape({
                tipoEntrega: yup.string().oneOf(["E", "B"]).required(),
                enderecoEntrega: yup.string().required(),
                obsEntrega: yup.string(),
                valorEntrega: yup.string()
              });
            } else if (passo === 4) {
              // Passopagamento
            }

            // cria objeto com base em state para validação)
            const formValues = inputsToValidation(this.state.inputs);

            // reinicia validade dos inputs do form em state
            const updatedInputs = inputsRestartValidity(this.state.inputs);
            this.setState({inputs: updatedInputs});

            // valida e define retorno dos erros em state
            if (schema) {
                schema.validate(formValues, {abortEarly: false})
                .then(() => {
                    this.setState({formIsValid: true});
                    this.setState({ loading: false });
                    resolve();
                })
                .catch(error => {
                    error.inner.forEach(formElement => {
                        let updatedInputs = inputsDefineErrors(formElement, this.state.inputs);
                        this.setState({inputs: updatedInputs});
                    });
                    this.setState({formIsValid: false});
                    this.setState({ loading: false });
                });
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        this.checkFormIsValid()
            .then(() => console.log('fomrulário é valido'));
    }

    render () {
        /**
         * Hmm... as variaveis criadas para o stepper precisam seguir a mesma orderm em todos os arrays
         * todo: criar um array de objetos contendo as propriedades a seguir
         * todo: ajustar componente VerticalStepper para receber o novo array de objetos
         */
        const steps = ['Cliente', 'Pizzas', 'Adicionais', 'Entrega', 'Pagamento'];
        const stepsContent = [
            <PassoCliente
                cliente={this.state.inputs.cliente}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                asyncSelectClientes={this.props.onSelectClientes}
                getClienteData={this.getClienteData}
                selectedClienteData={this.state.selectedClienteData}
                formIsValid={this.checkFormIsValid}
            />,
            <PassoPizzas
                tamanhos={this.props.tamanhos}
                sabores={this.props.sabores}
                bordas={this.props.bordas}
                pizzas={this.state.inputs.pizzas}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                formIsValid={this.checkFormIsValid}
                addPizza={this.addPizza}
                remPizza={this.remPizza}
                />,
            <PassoAdicionais
              adicionais={this.props.adicionais}
              selectedAdicionais={this.state.inputs.adicionais}
              inputChangeHandler={this.inputChangeHandler}
              inputBlurHandler={this.inputBlurHandler}
              formIsValid={this.checkFormIsValid}
              addAdicional={this.addAdicional}
              remAdicional={this.remAdicional}
              />,
            <PassoEntrega
              tipoEntrega={this.state.inputs.tipoEntrega}
              obsEntrega={this.state.inputs.obsEntrega}
              valorEntrega={this.state.inputs.valorEntrega}
              enderecoEntrega={this.state.inputs.enderecoEntrega}
              selectedClienteData={this.state.selectedClienteData}
              novoEndereco={this.state.inputs.novoEndereco}
              inputChangeHandler={this.inputChangeHandler}
              inputBlurHandler={this.inputBlurHandler}
              formIsValid={this.checkFormIsValid}
            />,
            'Forma de pagamento'
        ];
        const stepsValidation = [
            this.checkFormIsValid,
            this.checkFormIsValid,
            this.checkFormIsValid,
            this.checkFormIsValid,
            this.checkFormIsValid
        ];
        const optionalSteps = [2];

        return (
            <Form noValidate onSubmit={this.submitHandler}>
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
    return {
        tamanhos: state.tamanho.tamanho.tamanhos,
        sabores: state.sabor.sabor.sabores,
        bordas: state.borda.borda.bordas,
        adicionais: state.adicional.adicional.adicionais
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectClientes: (nome, telefone) => dispatch(actions.selectCliente(nome, telefone)),
        onGetCliente: (hashId) => dispatch(actions.getCliente(hashId)),
        onGetTamanhos: () => dispatch(actions.getTamanhos()),
        onGetSabores: () => dispatch(actions.getSabores()),
        onGetBordas: () => dispatch(actions.getBordas()),
        onGetAdicionais: () => dispatch(actions.getAdicionais())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoForm);
