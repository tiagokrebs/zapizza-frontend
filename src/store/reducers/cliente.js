import { CLIENTE } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    cliente: {
        api: {
            pending: false,
            error: null
        },
        clientes: [],
        totalItems: 0
    }
}

// Lista
const getClientesStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: true,
                error: null
            },
            clientes: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.cliente.api, { pending: true, error: null });
    // const cliente = updateObject(state.cliente, { api: api, clientes: [] });
    // return updateObject(state, { cliente: cliente });
};

const getClientesError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getClientesSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: null
            },
            clientes: action.clientes,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postClienteStart = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postClienteError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postClienteSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: null
            },
            clientes: [
                ...state.cliente.clientes,
                action.cliente
            ]
        }
    }
};


// Atualização
const putClienteStart = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putClienteError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putClienteSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: null
            },
            clientes: [
                ...state.cliente.clientes.map((item) => {
                    if (item.hash_id === action.cliente.hash_id) {
                        return {
                            ...action.cliente
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putClienteEnableStart = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putClienteEnableError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putClienteEnableSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: null
            },
            clientes: [
                ...state.cliente.clientes.map((item) => {
                    if (item.hash_id === action.cliente.hash_id) {
                        return {
                            ...item,
                            ativo: action.cliente.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteClienteStart = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteClienteError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteClienteSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                // pending: false,
                error: null
            },
            clientes: [
                ...state.cliente.clientes.filter((item) => {
                    if (item.hash_id === action.clienteId) {
                        return false;
                    }
                    return true;
                }),
            ]
        }
    }
};

// Pesquisa CEP
const pesquisaCepStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: true,
                error: null
            }
        }
    };
};

const pesquisaCepError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const pesquisaCepSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: null
            }
        }
    }
};

// Lista para select
const selectClientesStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: true,
                error: null
            }
        }
    };
};

const selectClientesError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const selectClientesSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: null
            }
        }
    }
};

// dados do cliente
const getClienteStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: true,
                error: null
            }
        }
    };
};

const getClienteError = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getClienteSuccess = (state, action) => {
    return {
        ...state,
        cliente: {
            ...state.cliente,
            api: {
                ...state.cliente.api,
                pending: false,
                error: null
            }
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTE.GET_CLIENTE_LIST_START: return getClientesStart(state, action);
        case CLIENTE.GET_CLIENTE_LIST_ERROR: return getClientesError(state, action);
        case CLIENTE.GET_CLIENTE_LIST_SUCCESS: return getClientesSuccess(state, action);
        case CLIENTE.POST_CLIENTE_START: return postClienteStart(state, action);
        case CLIENTE.POST_CLIENTE_ERROR: return postClienteError(state, action);
        case CLIENTE.POST_CLIENTE_SUCCESS: return postClienteSuccess(state, action);
        case CLIENTE.PUT_CLIENTE_START: return putClienteStart(state, action);
        case CLIENTE.PUT_CLIENTE_ERROR: return putClienteError(state, action);
        case CLIENTE.PUT_CLIENTE_SUCCESS: return putClienteSuccess(state, action);
        case CLIENTE.PUT_CLIENTE_ENABLE_START: return putClienteEnableStart(state, action);
        case CLIENTE.PUT_CLIENTE_ENABLE_ERROR: return putClienteEnableError(state, action);
        case CLIENTE.PUT_CLIENTE_ENABLE_SUCCESS: return putClienteEnableSuccess(state, action);
        case CLIENTE.DELETE_CLIENTE_START: return deleteClienteStart(state, action);
        case CLIENTE.DELETE_CLIENTE_ERROR: return deleteClienteError(state, action);
        case CLIENTE.DELETE_CLIENTE_SUCCESS: return deleteClienteSuccess(state, action);
        case CLIENTE.PESQUISA_CEP_START: return pesquisaCepStart(state, action);
        case CLIENTE.PESQUISA_CEP_ERROR: return pesquisaCepError(state, action);
        case CLIENTE.PESQUISA_CEP_SUCCESS: return pesquisaCepSuccess(state.action);
        case CLIENTE.SELECT_CLIENTE_START: return selectClientesStart(state, action);
        case CLIENTE.SELECT_CLIENTE_ERROR: return selectClientesError(state, action);
        case CLIENTE.SELECT_CLIENTE_SUCCESS: return selectClientesSuccess(state, action);
        case CLIENTE.GET_CLIENTE_START: return getClienteStart(state, action);
        case CLIENTE.GET_CLIENTE_ERROR: return getClienteError(state, action);
        case CLIENTE.GET_CLIENTE_SUCCESS: return getClienteSuccess(state, action);
        default: return state;
    }
};

export default reducer;