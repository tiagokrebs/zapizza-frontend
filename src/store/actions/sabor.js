import axios from '../../shared/axios-auth';

import { SABOR } from './actionsTypes';

// Lista
export const getSaboresStart = () => {
    return {
        type: SABOR.GET_SABOR_LIST_START
    };
};

export const getSaboresError = (error) => {
    return {
        type: SABOR.GET_SABOR_LIST_ERROR,
        error: error
    };
};

export const getSaboresSuccess = (data) => {
    return {
        type: SABOR.GET_SABOR_LIST_SUCCESS,
        sabores: data.sabores,
        totalItems: data.totalItems
    };
};

export const getSabores = () => {
    return dispatch => {
        dispatch(getSaboresStart());
        axios.get('/sabores', { withCredentials: true })
        .then(response => {
            dispatch(getSaboresSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getSaboresError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getSaboresError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getSaboresError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postSaborStart = () => {
    return {
        type: SABOR.POST_SABOR_START
    };
};

export const postSaborError = (error) => {
    return {
        type: SABOR.POST_SABOR_ERROR,
        error: error
    };
};

export const postSaborSuccess = (data) => {
    return {
        type: SABOR.POST_SABOR_SUCCESS,
        sabor: data.sabor
    };
};

export const postSabor = (saborData) => {
    return dispatch => {
        dispatch(postSaborStart());
        return axios.post('/sabores', saborData, { withCredentials: true })
        .then(response => {
            dispatch(postSaborSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postSaborError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postSaborError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postSaborError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putSaborStart = () => {
    return {
        type: SABOR.PUT_SABOR_START
    };
};

export const putSaborError = (error) => {
    return {
        type: SABOR.PUT_SABOR_ERROR,
        error: error
    };
};

export const putSaborSuccess = (data) => {
    return {
        type: SABOR.PUT_SABOR_SUCCESS,
        sabor: data.sabor
    };
};

export const putSabor = (saborId, saborData) => {
    return dispatch => {
        dispatch(putSaborStart());
        return axios.put('/sabores/' + saborId, saborData, { withCredentials: true })
        .then(response => {
            dispatch(putSaborSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putSaborError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putSaborError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putSaborError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putSaborEnableStart = () => {
    return {
        type: SABOR.PUT_SABOR_ENABLE_START
    };
};

export const putSaborEnableError = (error) => {
    return {
        type: SABOR.PUT_SABOR_ENABLE_ERROR,
        error: error
    };
};

export const putSaborEnableSuccess = (data) => {
    return {
        type: SABOR.PUT_SABOR_ENABLE_SUCCESS,
        sabor: data.sabor
    };
};

export const putSaborEnable = (saborId, saborData) => {
    return dispatch => {
        dispatch(putSaborEnableStart());
        axios.put('/sabores/' + saborId + '/enable', saborData, { withCredentials: true })
        .then(response => {
            dispatch(putSaborEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putSaborEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putSaborEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putSaborEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deleteSaborStart = () => {
    return {
        type: SABOR.DELETE_SABOR_START
    };
};

export const deleteSaborError = (error) => {
    return {
        type: SABOR.DELETE_SABOR_ERROR,
        error: error
    };
};

export const deleteSaborSuccess = (saborId) => {
    return {
        type: SABOR.DELETE_SABOR_SUCCESS,
        saborId: saborId
    };
};

export const deleteSabor = (saborId) => {
    return dispatch => {
        dispatch(deleteSaborStart());
        return axios.delete('/sabores/' + saborId, { withCredentials: true })
        .then(response => {
            dispatch(deleteSaborSuccess(saborId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deleteSaborError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deleteSaborError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deleteSaborError({ code: null, message: error.message }));
              }
        });
    };
};