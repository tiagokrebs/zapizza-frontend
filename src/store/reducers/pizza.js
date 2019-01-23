import { PIZZA } from '../actions/actionsTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    tamanho: {
        api: {
            pending: false,
            error: null
        },
        tamanhos: []
    }
}

const getTamanhosStart = (state, action) => {
    const api = { pending: true, error: null }
    const tamanho = { tamanho: { api: api, tamanhos: [] }}
    return updateObject(state, tamanho);
};

const getTamanhosError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const tamanho = { tamanho: { api: api, tamanhos: [] }};
    return updateObject(state, tamanho);
};

const getTamanhosSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const tamanho = { tamanho: { api: api, tamanhos: action.tamanhos }}
    return updateObject(state, tamanho);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PIZZA.GET_TAMANHOS_START: return getTamanhosStart(state, action);
        case PIZZA.GET_TAMANHOS_ERROR: return getTamanhosError(state, action);
        case PIZZA.GET_TAMANHOS_SUCCESS: return getTamanhosSuccess(state, action);
        default: return state;
    }
};

export default reducer;