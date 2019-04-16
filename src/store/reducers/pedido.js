import { PEDIDO } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    pedido: {
        api: {
            pending: false,
            error: null
        },
        pedidos: [],
        totalItems: 0
    }
}

// Lista
const getPedidosStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                pending: true,
                error: null
            },
            pedidos: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.pedido.api, { pending: true, error: null });
    // const pedido = updateObject(state.pedido, { api: api, pedidos: [] });
    // return updateObject(state, { pedido: pedido });
};

const getPedidosError = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getPedidosSuccess = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                pending: false,
                error: null
            },
            pedidos: action.pedidos,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postClienteStart = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postClienteError = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postClienteSuccess = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: null
            },
            pedidos: [
                ...state.pedido.pedidos,
                action.pedido
            ]
        }
    }
};


// Atualização
const putClienteStart = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putClienteError = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putClienteSuccess = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: null
            },
            pedidos: [
                ...state.pedido.pedidos.map((item) => {
                    if (item.hash_id === action.pedido.hash_id) {
                        return {
                            ...action.pedido
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
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putClienteEnableError = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putClienteEnableSuccess = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: null
            },
            pedidos: [
                ...state.pedido.pedidos.map((item) => {
                    if (item.hash_id === action.pedido.hash_id) {
                        return {
                            ...item,
                            ativo: action.pedido.ativo
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
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteClienteError = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteClienteSuccess = (state, action) => {
    return {
        ...state,
        pedido: {
            ...state.pedido,
            api: {
                ...state.pedido.api,
                // pending: false,
                error: null
            },
            pedidos: [
                ...state.pedido.pedidos.filter((item) => {
                    if (item.hash_id === action.pedidoId) {
                        return false;
                    }
                    return true;
                }),
            ]
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PEDIDO.GET_PEDIDO_LIST_START: return getPedidosStart(state, action);
        case PEDIDO.GET_PEDIDO_LIST_ERROR: return getPedidosError(state, action);
        case PEDIDO.GET_PEDIDO_LIST_SUCCESS: return getPedidosSuccess(state, action);
        case PEDIDO.POST_PEDIDO_START: return postClienteStart(state, action);
        case PEDIDO.POST_PEDIDO_ERROR: return postClienteError(state, action);
        case PEDIDO.POST_PEDIDO_SUCCESS: return postClienteSuccess(state, action);
        case PEDIDO.PUT_PEDIDO_START: return putClienteStart(state, action);
        case PEDIDO.PUT_PEDIDO_ERROR: return putClienteError(state, action);
        case PEDIDO.PUT_PEDIDO_SUCCESS: return putClienteSuccess(state, action);
        case PEDIDO.PUT_PEDIDO_ENABLE_START: return putClienteEnableStart(state, action);
        case PEDIDO.PUT_PEDIDO_ENABLE_ERROR: return putClienteEnableError(state, action);
        case PEDIDO.PUT_PEDIDO_ENABLE_SUCCESS: return putClienteEnableSuccess(state, action);
        case PEDIDO.DELETE_PEDIDO_START: return deleteClienteStart(state, action);
        case PEDIDO.DELETE_PEDIDO_ERROR: return deleteClienteError(state, action);
        case PEDIDO.DELETE_PEDIDO_SUCCESS: return deleteClienteSuccess(state, action);
        default: return state;
    }
};

export default reducer;