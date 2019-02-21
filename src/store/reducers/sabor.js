import { SABOR } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    sabor: {
        api: {
            pending: false,
            error: null
        },
        sabores: [],
        totalItems: 0
    }
}

// Lista
const getSaboresStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                pending: true,
                error: null
            },
            sabores: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.sabor.api, { pending: true, error: null });
    // const sabor = updateObject(state.sabor, { api: api, sabores: [] });
    // return updateObject(state, { sabor: sabor });
};

const getSaboresError = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getSaboresSuccess = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                pending: false,
                error: null
            },
            sabores: action.sabores,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postSaborStart = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postSaborError = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postSaborSuccess = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: null
            },
            sabores: [
                ...state.sabor.sabores,
                action.sabor
            ]
        }
    }
};


// Atualização
const putSaborStart = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putSaborError = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putSaborSuccess = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: null
            },
            sabores: [
                ...state.sabor.sabores.map((item) => {
                    if (item.hash_id === action.sabor.hash_id) {
                        return {
                            ...action.sabor
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putSaborEnableStart = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putSaborEnableError = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putSaborEnableSuccess = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: null
            },
            sabores: [
                ...state.sabor.sabores.map((item) => {
                    if (item.hash_id === action.sabor.hash_id) {
                        return {
                            ...item,
                            ativo: action.sabor.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteSaborStart = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteSaborError = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteSaborSuccess = (state, action) => {
    return {
        ...state,
        sabor: {
            ...state.sabor,
            api: {
                ...state.sabor.api,
                // pending: false,
                error: null
            },
            sabores: [
                ...state.sabor.sabores.filter((item) => {
                    if (item.hash_id === action.saborId) {
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
        case SABOR.GET_SABOR_LIST_START: return getSaboresStart(state, action);
        case SABOR.GET_SABOR_LIST_ERROR: return getSaboresError(state, action);
        case SABOR.GET_SABOR_LIST_SUCCESS: return getSaboresSuccess(state, action);
        case SABOR.POST_SABOR_START: return postSaborStart(state, action);
        case SABOR.POST_SABOR_ERROR: return postSaborError(state, action);
        case SABOR.POST_SABOR_SUCCESS: return postSaborSuccess(state, action);
        case SABOR.PUT_SABOR_START: return putSaborStart(state, action);
        case SABOR.PUT_SABOR_ERROR: return putSaborError(state, action);
        case SABOR.PUT_SABOR_SUCCESS: return putSaborSuccess(state, action);
        case SABOR.PUT_SABOR_ENABLE_START: return putSaborEnableStart(state, action);
        case SABOR.PUT_SABOR_ENABLE_ERROR: return putSaborEnableError(state, action);
        case SABOR.PUT_SABOR_ENABLE_SUCCESS: return putSaborEnableSuccess(state, action);
        case SABOR.DELETE_SABOR_START: return deleteSaborStart(state, action);
        case SABOR.DELETE_SABOR_ERROR: return deleteSaborError(state, action);
        case SABOR.DELETE_SABOR_SUCCESS: return deleteSaborSuccess(state, action);
        default: return state;
    }
};

export default reducer;