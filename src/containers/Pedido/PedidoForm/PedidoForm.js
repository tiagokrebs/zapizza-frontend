import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';
import classes from './PedidoForm.module.css';
import updateObject from '../../../shared/updateObject';
import * as actions from '../../../store/actions/';
import { conformToMask } from 'react-text-mask';
import * as masks from '../../../shared/inputMasks';
// import VerticalStepper from '../../../components/UI/VerticalStepper/VerticalStepper';
import HorizontalStepper from '../../../components/UI/HorizontalStepper/HorizontalStepper';
import PassoCliente from './PassoCliente/PassoCliente';
import PassoPizzas from './PassoPizzas/PassoPizzas';
import PassoAdicionais from './PassoAdicionais/PassoAdicionais';
import PassoEntrega from './PassoEntrega/PassoEntrega';
import PedidoResumo from './PedidoResumo/PedidoRemumo';
import * as yup from 'yup';
import { yupLocale, inputsToValidation, inputsRestartValidity, inputsDefineErrors } from '../../../shared/yupHelpers';

class PedidoForm extends Component {
    getInitialState = () => {
        const initialState = {
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
                cep: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                logradouro: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                numero: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                complemento: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                bairro: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                cidade: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
                },
                estado: {
                    value: '', 
                    invalid: false, 
                    error: '', 
                    touched: true
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
            totalPizzas: 0,
            resumoPizzas: [],
            totalAdicionais: 0,
            resumoAdicionais: '',
            totalEntrega: 0,
            resumoEntrega: '',
            totalPedido: 0,
            allStepsCompleted: false,
            formIsValid: false,
            formSubmitSuceed: false
        }

        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    // state é definido e constante para utilizar função resetState
    state = this.getInitialState();

    completeSteps = () => {
        this.setState({allStepsCompleted: true});
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
                }}, () => this.setTotais());
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
      }, () => this.setTotais());
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
      }, () => this.setTotais());
    }

    componentDidMount() {
        if (this.props.tamanhos.length === 0) {
            this.props.onGetTamanhos();
        }
        if (this.props.sabores.length === 0) {
            this.props.onGetSabores();
        }
        if (this.props.bordas.length === 0) {
            this.props.onGetBordas();
        }
        if (this.props.adicionais.length === 0) {
            this.props.onGetAdicionais();
        }
    }

    inputChangeHandler = (event) => {
        // alterações nos inputs utiliza callback em setState para calculo de totais
        if (["adicionais", "tipoEntrega", "obsEntrega", "valorEntrega", "enderecoEntrega"].includes(event.target.name)) {
            // handler para inputs fixos
            const updatedFormElement = updateObject(this.state.inputs[event.target.name], {
                value: event.target.value,
            });

            const updatedinputs = updateObject(this.state.inputs, {
                [event.target.name]: updatedFormElement
            });

            this.setState({inputs: updatedinputs}, () => this.setTotais());
        } else if (["tamanho", "sabores", "bordas"].includes(event.target.name)) {
            // handler para inputs dinamicos de telefone
            let pizzas = [...this.state.inputs.pizzas]
            pizzas[event.target.id][event.target.name].value = event.target.value
            this.setState({...this.state,
                inputs: {
                    ...this.state.inputs,
                    pizzas: pizzas
                }
            }, () => this.setTotais());
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
                }, () => this.setTotais());
            })
    }

    setTotais = () => {
        let totPizzas = 0, totAdcionais = 0, totEntrega = 0;
        let resPizzas = '', listaResPizzas = [], resAdicionais = '', resEntrega = '';

        // pizzas
        this.state.inputs.pizzas.forEach((pizza, index) => {
            const tamanhoId = pizza.tamanho.value;
            const totalSabores = pizza.sabores.value.length;
            const totalBordas = pizza.bordas.value.length;

            // texto resumo tamanho
            this.props.tamanhos.forEach(tamanho => {
                if (tamanho.hash_id === tamanhoId) {
                    resPizzas = resPizzas.concat('#', index+1, ' ', tamanho.descricao);
                }
            });
            
            // valor sabores + texto resumo
            pizza.sabores.value.forEach(sabor => {
                const saborId = sabor.value;
                let valorSabor = 0;
                this.props.sabores.forEach(sabor => {
                    if (sabor.hash_id === saborId) {
                        sabor.tamanhos.forEach(tamanho => {
                            if (tamanho.hash_id === tamanhoId) {
                                valorSabor = tamanho.valor / totalSabores;
                                totPizzas += valorSabor;
                            }
                        });
                        resPizzas = resPizzas.concat(', ', sabor.descricao);
                    }
                });
            });
            
            // valor bordas + texto resumo
            pizza.bordas.value.forEach(borda => {
                const bordaId = borda.value;
                let valorBorda = 0;
                this.props.bordas.forEach((borda, index) => {
                    if (borda.hash_id === bordaId) {
                        valorBorda = borda.valor / totalBordas;
                        totPizzas += valorBorda;
                        resPizzas = resPizzas.concat(index === 0 ? 'Borda de ' : ', ', borda.descricao);
                    }
                });
            });

            listaResPizzas = [
                ...listaResPizzas,
                resPizzas
            ];
            resPizzas = '';            
        });

        // valor adicionais + texto resumo
        this.state.inputs.adicionais.value.forEach((adicional, index) => {
            this.props.adicionais.forEach(add => {
                if (add.hash_id === adicional.hash_id) {
                    totAdcionais += add.valor;
                    resAdicionais = resAdicionais.concat(index === 0 ? '' : ', ', add.descricao)
                }
            });
        });

        // valor entrega + texto resumo
        totEntrega = Number(masks.valorP6S2Unmask(this.state.inputs.valorEntrega.value));
        if (this.state.inputs.tipoEntrega.value === 'E') {
            let endereco = '';
            this.state.selectedClienteData.enderecos.forEach(end => {
                if (this.state.inputs.enderecoEntrega.value === end.hash_id) {
                    endereco = end.logradouro +
                    (end.numero ? ', ' + end.numero : '') +
                    (end.complemento ? ', ' + end.complemento : '') +
                    (end.bairro ? ', ' + end.bairro : '') +
                    (end.cidade ? ', ' + end.cidade : '');
                }
            });
            resEntrega = resEntrega.concat('Entrega. ', endereco, '. ', this.state.inputs.obsEntrega.value);
        } else {
            resEntrega = resEntrega.concat('Busca. ', this.state.inputs.obsEntrega.value);
        }

        // totais com ajuste para teto sempre em múltiplos de 0.5
        totPizzas = Math.ceil(totPizzas/0.5)*0.5;
        totAdcionais = Math.ceil(totAdcionais/0.5)*0.5
        totEntrega = Math.ceil(totEntrega/0.5)*0.5
        this.setState({
            totalPizzas: totPizzas,
            resumoPizzas: listaResPizzas,
            totalAdicionais: totAdcionais,
            resumoAdicionais: resAdicionais,
            totalEntrega: totEntrega,
            resumoEntrega: resEntrega,
            totalPedido: totPizzas + totAdcionais + totEntrega
        });

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

            // schemas dos passos
            const shapeCliente = {
                cliente: yup.string().required()
            }
            const schemaPizza = yup.object().shape({
                tamanho: yup.string().required(),
                sabores: yup.array().of(selectSchema).required(),
                bordas: yup.array().of(selectSchema)
            });
            const shapePizzas = {
                pizzas: yup.array().of(schemaPizza)
            };
            const shapeAdicionais = {
                adicionais: yup.array().of(selectSchema)
            };
            const shapeEntrega = {
                tipoEntrega: yup.string().oneOf(["E", "B"]).required(),
                enderecoEntrega: yup.string().required(),
                obsEntrega: yup.string(),
                valorEntrega: yup.string()
            }

            // cria schema com base em passo
            let schema;
            let inputs;
            if (passo === 0) {
                // PassoCliente
                schema = yup.object().shape(shapeCliente);
                // inputs = {
                //     cliente: {...this.state.inputs.cliente}
                // }
            } else if (passo === 1) {
                // PassoPizzas
                schema = yup.object().shape(shapePizzas);
                // inputs = {
                //     pizzas: {...this.state.inputs.pizzas}
                // }
            } else if (passo === 2) {
              // PassoAdicionais
              schema = yup.object().shape(shapeAdicionais);
            //   inputs = {
            //     adicionais: {...this.state.inputs.adicionais}
            //     }
            } else if (passo === 3) {
              // PassoEntrega
              schema = yup.object().shape(shapeEntrega);
            //   inputs = {
            //     tipoEntrega: {...this.state.inputs.tipoEntrega},
            //     enderecoEntrega: {...this.state.inputs.enderecoEntrega},
            //     obsEntrega: {...this.state.inputs.obsEntrega},
            //     valorEntrega: {...this.state.inputs.valorEntrega}
            //     }
            } else {
              // todos os passos
              schema = yup.object().shape({
                  ...shapeCliente,
                  ...shapePizzas,
                  ...shapeAdicionais,
                  ...shapeEntrega
              });
            //   inputs = {...this.state.inputs}
            }

            // cria objeto com base em state para validação
            const formValues = inputsToValidation(this.state.inputs);

            // reinicia validade dos inputs do form em state
            const updatedInputs = inputsRestartValidity(this.state.inputs);
           
            this.setState({inputs: updatedInputs});

            // validação manual de quantidade de sabores por tamanho
            let error = false;
            this.state.inputs.pizzas.forEach((pizza, index) => {
                let saboresPermitidos = 0;
                let bordasPermitidas = 0;
                this.props.tamanhos.forEach(tamanho => {
                    if (tamanho.hash_id === pizza.tamanho.value) {
                        saboresPermitidos = tamanho.quantSabores;
                        bordasPermitidas = tamanho.quantBordas;
                    }
                });
                if (saboresPermitidos < pizza.sabores.value.length) {
                    let pizzas = [...this.state.inputs.pizzas]
                    pizzas[index].sabores.touched = true;
                    pizzas[index].sabores.invalid = true;
                    pizzas[index].sabores.error = 'O tamanho permite apenas ' + saboresPermitidos + ' sabor(es)';
                    this.setState({...this.state,
                        inputs: {
                            ...this.state.inputs,
                            pizzas: pizzas
                    }});

                    error = true;
                }
                if (bordasPermitidas < pizza.bordas.value.length) {
                    let pizzas = [...this.state.inputs.pizzas]
                    pizzas[index].bordas.touched = true;
                    pizzas[index].bordas.invalid = true;
                    pizzas[index].bordas.error = 'O tamanho permite apenas ' + bordasPermitidas + ' borda(s)';
                    this.setState({...this.state,
                        inputs: {
                            ...this.state.inputs,
                            pizzas: pizzas
                    }});

                    error = true;
                }
            });

            /**
             * se quantidade de sabores ou bordas excede limite chama reject()
             * return não é chamado para que validação por schema prossiga
             * caso reject() seja chamado nesse ponto o resolve() posterior
             * não terá efeito
             */
            if (error) {
                reject();
            }

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
                    reject('Falha na validação');
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
         * Hmm... as variaveis criadas para o stepper precisam seguir a mesma ordem em todos os arrays
         * todo: criar um array de objetos contendo as propriedades a seguir
         * todo: ajustar componente VerticalStepper para receber o novo array de objetos
         */
        const steps = ['Cliente', 'Pizzas', 'Adicionais', 'Entrega'];
        const stepsContent = [
            <PassoCliente
                cliente={this.state.inputs.cliente}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                asyncSelectClientes={this.props.onSelectClientes}
                getClienteData={this.getClienteData}
                selectedClienteData={this.state.selectedClienteData}
                formIsValid={this.checkFormIsValid}
                onUpdateSize={this.props.onUpdateSize}
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
                onUpdateSize={this.props.onUpdateSize}
                />,
            <PassoAdicionais
              adicionais={this.props.adicionais}
              selectedAdicionais={this.state.inputs.adicionais}
              inputChangeHandler={this.inputChangeHandler}
              inputBlurHandler={this.inputBlurHandler}
              formIsValid={this.checkFormIsValid}
              addAdicional={this.addAdicional}
              remAdicional={this.remAdicional}
              onUpdateSize={this.props.onUpdateSize}
              />,
            <PassoEntrega
                tipoEntrega={this.state.inputs.tipoEntrega}
                obsEntrega={this.state.inputs.obsEntrega}
                valorEntrega={this.state.inputs.valorEntrega}
                enderecoEntrega={this.state.inputs.enderecoEntrega}
                selectedClienteData={this.state.selectedClienteData}
                inputChangeHandler={this.inputChangeHandler}
                inputBlurHandler={this.inputBlurHandler}
                formIsValid={this.checkFormIsValid}
                onUpdateSize={this.props.onUpdateSize}
            />
        ];
        const stepsValidation = [
            this.checkFormIsValid,
            this.checkFormIsValid,
            this.checkFormIsValid,
            this.checkFormIsValid
        ];
        const optionalSteps = [2];

        return (
            <Form noValidate onSubmit={this.submitHandler} className={classes.PedidoForm}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className={`card ${classes.Card}`}>
                            <div className={`card-header ${classes.CardHeader}`}>
                                <h6 className={`card-title ${classes.CardTitle}`}>Monte o pedido</h6>
                                <small>Siga os passos</small>
                            </div>
                            <div className={`card-block ${classes.CardBlock}`}>
                                <HorizontalStepper
                                    steps={steps}
                                    stepsContent={stepsContent}
                                    stepsValidation={stepsValidation}
                                    optionalSteps={optionalSteps}
                                    parentCompleteSteps={this.completeSteps}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <PedidoResumo
                            totalPizzas={this.state.totalPizzas}
                            totalAdicionais={this.state.totalAdicionais}
                            totalEntrega={this.state.totalEntrega}
                            totalPedido={this.state.totalPedido}
                            resumoPizzas={this.state.resumoPizzas}
                            resumoAdicionais={this.state.resumoAdicionais}
                            resumoEntrega={this.state.resumoEntrega}
                            cancelAction={this.props.cancelAll}
                            />
                    </div>
                </div>
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
