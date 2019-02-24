import axios from '../../shared/axios-auth';

import { BEBIDA } from './actionsTypes';

// Lista
export const getBebidasStart = () => {
    return {
        type: BEBIDA.GET_BEBIDA_LIST_START
    };
};

export const getBebidasError = (error) => {
    return {
        type: BEBIDA.GET_BEBIDA_LIST_ERROR,
        error: error
    };
};

export const getBebidasSuccess = (data) => {
    return {
        type: BEBIDA.GET_BEBIDA_LIST_SUCCESS,
        bebidas: data.bebidas,
        totalItems: data.totalItems
    };
};

export const getBebidas = () => {
    return dispatch => {
        dispatch(getBebidasStart());
        axios.get('/bebidas', { withCredentials: true })
        .then(response => {
            dispatch(getBebidasSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getBebidasError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getBebidasError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getBebidasError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postBebidaStart = () => {
    return {
        type: BEBIDA.POST_BEBIDA_START
    };
};

export const postBebidaError = (error) => {
    return {
        type: BEBIDA.POST_BEBIDA_ERROR,
        error: error
    };
};

export const postBebidaSuccess = (data) => {
    return {
        type: BEBIDA.POST_BEBIDA_SUCCESS,
        bebida: data.bebida
    };
};

export const postBebida = (bebidaData) => {
    return dispatch => {
        dispatch(postBebidaStart());
        return axios.post('/bebidas', bebidaData, { withCredentials: true })
        .then(response => {
            dispatch(postBebidaSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postBebidaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postBebidaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postBebidaError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putBebidaStart = () => {
    return {
        type: BEBIDA.PUT_BEBIDA_START
    };
};

export const putBebidaError = (error) => {
    return {
        type: BEBIDA.PUT_BEBIDA_ERROR,
        error: error
    };
};

export const putBebidaSuccess = (data) => {
    return {
        type: BEBIDA.PUT_BEBIDA_SUCCESS,
        bebida: data.bebida
    };
};

export const putBebida = (bebidaId, bebidaData) => {
    return dispatch => {
        dispatch(putBebidaStart());
        return axios.put('/bebidas/' + bebidaId, bebidaData, { withCredentials: true })
        .then(response => {
            dispatch(putBebidaSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putBebidaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putBebidaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putBebidaError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putBebidaEnableStart = () => {
    return {
        type: BEBIDA.PUT_BEBIDA_ENABLE_START
    };
};

export const putBebidaEnableError = (error) => {
    return {
        type: BEBIDA.PUT_BEBIDA_ENABLE_ERROR,
        error: error
    };
};

export const putBebidaEnableSuccess = (data) => {
    return {
        type: BEBIDA.PUT_BEBIDA_ENABLE_SUCCESS,
        bebida: data.bebida
    };
};

export const putBebidaEnable = (bebidaId, bebidaData) => {
    return dispatch => {
        dispatch(putBebidaEnableStart());
        axios.put('/bebidas/' + bebidaId + '/enable', bebidaData, { withCredentials: true })
        .then(response => {
            dispatch(putBebidaEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putBebidaEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putBebidaEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putBebidaEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deleteBebidaStart = () => {
    return {
        type: BEBIDA.DELETE_BEBIDA_START
    };
};

export const deleteBebidaError = (error) => {
    return {
        type: BEBIDA.DELETE_BEBIDA_ERROR,
        error: error
    };
};

export const deleteBebidaSuccess = (bebidaId) => {
    return {
        type: BEBIDA.DELETE_BEBIDA_SUCCESS,
        bebidaId: bebidaId
    };
};

export const deleteBebida = (bebidaId) => {
    return dispatch => {
        dispatch(deleteBebidaStart());
        return axios.delete('/bebidas/' + bebidaId, { withCredentials: true })
        .then(response => {
            dispatch(deleteBebidaSuccess(bebidaId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deleteBebidaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deleteBebidaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deleteBebidaError({ code: null, message: error.message }));
              }
        });
    };
};