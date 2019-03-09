
import { ADICIONAL } from '../actions/actionsTypes';
// import updateObject from '../../shared/updateObject';

const initialState = {
    adicional: {
        api: {
            pending: false,
            error: null
        },
        adicionais: [],
        totalItems: 0
    }
}

// Lista
const getAdicionaisStart = (state, action) => {
    // utiliziando operador ...
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                pending: true,
                error: null
            },
            adicionais: [],
            totalItems: 0
        }
    };
    
    // utilizando função updateObject
    // const api = updateObject(state.adicional.api, { pending: true, error: null });
    // const adicional = updateObject(state.adicional, { api: api, adicionais: [] });
    // return updateObject(state, { adicional: adicional });
};

const getAdicionaisError = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                pending: false,
                error: action.error
            }
        }
    }
};

const getAdicionaisSuccess = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                pending: false,
                error: null
            },
            adicionais: action.adicionais,
            totalItems: action.totalItems
        }
    }
};

// Inserção
const postAdicionalStart = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: true,
                error: null
            }
        }
    }
};

const postAdicionalError = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const postAdicionalSuccess = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: null
            },
            adicionais: [
                ...state.adicional.adicionais,
                action.adicional
            ]
        }
    }
};


// Atualização
const putAdicionalStart = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putAdicionalError = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putAdicionalSuccess = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: null
            },
            adicionais: [
                ...state.adicional.adicionais.map((item) => {
                    if (item.hash_id === action.adicional.hash_id) {
                        return {
                            ...action.adicional
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Ativa/Desativa
const putAdicionalEnableStart = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: true,
                error: null
            }
        }
    }
};

const putAdicionalEnableError = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const putAdicionalEnableSuccess = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: null
            },
            adicionais: [
                ...state.adicional.adicionais.map((item) => {
                    if (item.hash_id === action.adicional.hash_id) {
                        return {
                            ...item,
                            ativo: action.adicional.ativo
                        }
                    }
                    return item;
                }),
            ]
        }
    }
};

// Deleta
const deleteAdicionalStart = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: true,
                error: null
            }
        }
    }
};

const deleteAdicionalError = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: action.error
            }
        }
    }
};

const deleteAdicionalSuccess = (state, action) => {
    return {
        ...state,
        adicional: {
            ...state.adicional,
            api: {
                ...state.adicional.api,
                // pending: false,
                error: null
            },
            adicionais: [
                ...state.adicional.adicionais.filter((item) => {
                    if (item.hash_id === action.adicionalId) {
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
        case ADICIONAL.GET_ADICIONAL_LIST_START: return getAdicionaisStart(state, action);
        case ADICIONAL.GET_ADICIONAL_LIST_ERROR: return getAdicionaisError(state, action);
        case ADICIONAL.GET_ADICIONAL_LIST_SUCCESS: return getAdicionaisSuccess(state, action);
        case ADICIONAL.POST_ADICIONAL_START: return postAdicionalStart(state, action);
        case ADICIONAL.POST_ADICIONAL_ERROR: return postAdicionalError(state, action);
        case ADICIONAL.POST_ADICIONAL_SUCCESS: return postAdicionalSuccess(state, action);
        case ADICIONAL.PUT_ADICIONAL_START: return putAdicionalStart(state, action);
        case ADICIONAL.PUT_ADICIONAL_ERROR: return putAdicionalError(state, action);
        case ADICIONAL.PUT_ADICIONAL_SUCCESS: return putAdicionalSuccess(state, action);
        case ADICIONAL.PUT_ADICIONAL_ENABLE_START: return putAdicionalEnableStart(state, action);
        case ADICIONAL.PUT_ADICIONAL_ENABLE_ERROR: return putAdicionalEnableError(state, action);
        case ADICIONAL.PUT_ADICIONAL_ENABLE_SUCCESS: return putAdicionalEnableSuccess(state, action);
        case ADICIONAL.DELETE_ADICIONAL_START: return deleteAdicionalStart(state, action);
        case ADICIONAL.DELETE_ADICIONAL_ERROR: return deleteAdicionalError(state, action);
        case ADICIONAL.DELETE_ADICIONAL_SUCCESS: return deleteAdicionalSuccess(state, action);
        default: return state;
    }
};

export default reducer;