import { BORDA } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    borda: {
        api: {
            pending: false,
            error: null
        },
        bordas: [],
        totalItems: 0
    }
}

// Lista
const getBordasStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                pending: true,
                error: null
            },
            bordas: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.borda.api, { pending: true, error: null });
    // const borda = updateObject(state.borda, { api: api, bordas: [] });
    // return updateObject(state, { borda: borda });
};

const getBordasError = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getBordasSuccess = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                pending: false,
                error: null
            },
            bordas: action.bordas,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postBordaStart = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postBordaError = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postBordaSuccess = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: null
            },
            bordas: [
                ...state.borda.bordas,
                action.borda
            ]
        }
    }
};


// Atualização
const putBordaStart = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putBordaError = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putBordaSuccess = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: null
            },
            bordas: [
                ...state.borda.bordas.map((item) => {
                    if (item.hash_id === action.borda.hash_id) {
                        return {
                            ...action.borda
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putBordaEnableStart = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putBordaEnableError = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putBordaEnableSuccess = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: null
            },
            bordas: [
                ...state.borda.bordas.map((item) => {
                    if (item.hash_id === action.borda.hash_id) {
                        return {
                            ...item,
                            ativo: action.borda.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteBordaStart = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteBordaError = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteBordaSuccess = (state, action) => {
    return {
        ...state,
        borda: {
            ...state.borda,
            api: {
                ...state.borda.api,
                // pending: false,
                error: null
            },
            bordas: [
                ...state.borda.bordas.filter((item) => {
                    if (item.hash_id === action.bordaId) {
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
        case BORDA.GET_BORDA_LIST_START: return getBordasStart(state, action);
        case BORDA.GET_BORDA_LIST_ERROR: return getBordasError(state, action);
        case BORDA.GET_BORDA_LIST_SUCCESS: return getBordasSuccess(state, action);
        case BORDA.POST_BORDA_START: return postBordaStart(state, action);
        case BORDA.POST_BORDA_ERROR: return postBordaError(state, action);
        case BORDA.POST_BORDA_SUCCESS: return postBordaSuccess(state, action);
        case BORDA.PUT_BORDA_START: return putBordaStart(state, action);
        case BORDA.PUT_BORDA_ERROR: return putBordaError(state, action);
        case BORDA.PUT_BORDA_SUCCESS: return putBordaSuccess(state, action);
        case BORDA.PUT_BORDA_ENABLE_START: return putBordaEnableStart(state, action);
        case BORDA.PUT_BORDA_ENABLE_ERROR: return putBordaEnableError(state, action);
        case BORDA.PUT_BORDA_ENABLE_SUCCESS: return putBordaEnableSuccess(state, action);
        case BORDA.DELETE_BORDA_START: return deleteBordaStart(state, action);
        case BORDA.DELETE_BORDA_ERROR: return deleteBordaError(state, action);
        case BORDA.DELETE_BORDA_SUCCESS: return deleteBordaSuccess(state, action);
        default: return state;
    }
};

export default reducer;