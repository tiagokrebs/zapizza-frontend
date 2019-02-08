import { PIZZA } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    tamanho: {
        api: {
            pending: false,
            error: null
        },
        tamanhos: []
    }
}

// Lista
const getTamanhosStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                pending: true,
                error: null
            },
            tamanhos: []
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.tamanho.api, { pending: true, error: null });
    // const tamanho = updateObject(state.tamanho, { api: api, tamanhos: [] });
    // return updateObject(state, { tamanho: tamanho });
};

const getTamanhosError = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getTamanhosSuccess = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                pending: false,
                error: null
            },
            tamanhos: action.tamanhos
        }
    }
};

// Inserção
const postTamanhoStart = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postTamanhoError = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postTamanhoSuccess = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: null
            },
            tamanhos: [
                ...state.tamanho.tamanhos,
                action.tamanho
            ]
        }
    }
};


// Atualização
const putTamanhoStart = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putTamanhoError = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putTamanhoSuccess = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: null
            },
            tamanhos: [
                ...state.tamanho.tamanhos.map((item) => {
                    if (item.hash_id === action.tamanho.hash_id) {
                        return {
                            ...action.tamanho
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putTamanhoEnableStart = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putTamanhoEnableError = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putTamanhoEnableSuccess = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: null
            },
            tamanhos: [
                ...state.tamanho.tamanhos.map((item) => {
                    if (item.hash_id === action.tamanho.hash_id) {
                        return {
                            ...item,
                            ativo: action.tamanho.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteTamanhoStart = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteTamanhoError = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteTamanhoSuccess = (state, action) => {
    return {
        ...state,
        tamanho: {
            ...state.tamanho,
            api: {
                ...state.tamanho.api,
                // pending: false,
                error: null
            },
            tamanhos: [
                ...state.tamanho.tamanhos.filter((item) => {
                    if (item.hash_id === action.tamanhoId) {
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
        case PIZZA.GET_TAMANHO_LIST_START: return getTamanhosStart(state, action);
        case PIZZA.GET_TAMANHO_LIST_ERROR: return getTamanhosError(state, action);
        case PIZZA.GET_TAMANHO_LIST_SUCCESS: return getTamanhosSuccess(state, action);
        case PIZZA.POST_TAMANHO_START: return postTamanhoStart(state, action);
        case PIZZA.POST_TAMANHO_ERROR: return postTamanhoError(state, action);
        case PIZZA.POST_TAMANHO_SUCCESS: return postTamanhoSuccess(state, action);
        case PIZZA.PUT_TAMANHO_START: return putTamanhoStart(state, action);
        case PIZZA.PUT_TAMANHO_ERROR: return putTamanhoError(state, action);
        case PIZZA.PUT_TAMANHO_SUCCESS: return putTamanhoSuccess(state, action);
        case PIZZA.PUT_TAMANHO_ENABLE_START: return putTamanhoEnableStart(state, action);
        case PIZZA.PUT_TAMANHO_ENABLE_ERROR: return putTamanhoEnableError(state, action);
        case PIZZA.PUT_TAMANHO_ENABLE_SUCCESS: return putTamanhoEnableSuccess(state, action);
        case PIZZA.DELETE_TAMANHO_START: return deleteTamanhoStart(state, action);
        case PIZZA.DELETE_TAMANHO_ERROR: return deleteTamanhoError(state, action);
        case PIZZA.DELETE_TAMANHO_SUCCESS: return deleteTamanhoSuccess(state, action);
        default: return state;
    }
};

export default reducer;