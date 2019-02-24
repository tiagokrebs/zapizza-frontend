import { BEBIDA } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    bebida: {
        api: {
            pending: false,
            error: null
        },
        bebidas: [],
        totalItems: 0
    }
}

// Lista
const getBebidasStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                pending: true,
                error: null
            },
            bebidas: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.bebida.api, { pending: true, error: null });
    // const bebida = updateObject(state.bebida, { api: api, bebidas: [] });
    // return updateObject(state, { bebida: bebida });
};

const getBebidasError = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getBebidasSuccess = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                pending: false,
                error: null
            },
            bebidas: action.bebidas,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postBebidaStart = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postBebidaError = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postBebidaSuccess = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: null
            },
            bebidas: [
                ...state.bebida.bebidas,
                action.bebida
            ]
        }
    }
};


// Atualização
const putBebidaStart = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putBebidaError = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putBebidaSuccess = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: null
            },
            bebidas: [
                ...state.bebida.bebidas.map((item) => {
                    if (item.hash_id === action.bebida.hash_id) {
                        return {
                            ...action.bebida
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putBebidaEnableStart = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putBebidaEnableError = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putBebidaEnableSuccess = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: null
            },
            bebidas: [
                ...state.bebida.bebidas.map((item) => {
                    if (item.hash_id === action.bebida.hash_id) {
                        return {
                            ...item,
                            ativo: action.bebida.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteBebidaStart = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteBebidaError = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteBebidaSuccess = (state, action) => {
    return {
        ...state,
        bebida: {
            ...state.bebida,
            api: {
                ...state.bebida.api,
                // pending: false,
                error: null
            },
            bebidas: [
                ...state.bebida.bebidas.filter((item) => {
                    if (item.hash_id === action.bebidaId) {
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
        case BEBIDA.GET_BEBIDA_LIST_START: return getBebidasStart(state, action);
        case BEBIDA.GET_BEBIDA_LIST_ERROR: return getBebidasError(state, action);
        case BEBIDA.GET_BEBIDA_LIST_SUCCESS: return getBebidasSuccess(state, action);
        case BEBIDA.POST_BEBIDA_START: return postBebidaStart(state, action);
        case BEBIDA.POST_BEBIDA_ERROR: return postBebidaError(state, action);
        case BEBIDA.POST_BEBIDA_SUCCESS: return postBebidaSuccess(state, action);
        case BEBIDA.PUT_BEBIDA_START: return putBebidaStart(state, action);
        case BEBIDA.PUT_BEBIDA_ERROR: return putBebidaError(state, action);
        case BEBIDA.PUT_BEBIDA_SUCCESS: return putBebidaSuccess(state, action);
        case BEBIDA.PUT_BEBIDA_ENABLE_START: return putBebidaEnableStart(state, action);
        case BEBIDA.PUT_BEBIDA_ENABLE_ERROR: return putBebidaEnableError(state, action);
        case BEBIDA.PUT_BEBIDA_ENABLE_SUCCESS: return putBebidaEnableSuccess(state, action);
        case BEBIDA.DELETE_BEBIDA_START: return deleteBebidaStart(state, action);
        case BEBIDA.DELETE_BEBIDA_ERROR: return deleteBebidaError(state, action);
        case BEBIDA.DELETE_BEBIDA_SUCCESS: return deleteBebidaSuccess(state, action);
        default: return state;
    }
};

export default reducer;