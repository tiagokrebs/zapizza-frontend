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
        default: return state;
    }
};

export default reducer;