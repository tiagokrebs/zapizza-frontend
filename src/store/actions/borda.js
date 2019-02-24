import axios from '../../shared/axios-auth';

import { BORDA } from './actionsTypes';

// Lista
export const getBordasStart = () => {
    return {
        type: BORDA.GET_BORDA_LIST_START
    };
};

export const getBordasError = (error) => {
    return {
        type: BORDA.GET_BORDA_LIST_ERROR,
        error: error
    };
};

export const getBordasSuccess = (data) => {
    return {
        type: BORDA.GET_BORDA_LIST_SUCCESS,
        bordas: data.bordas,
        totalItems: data.totalItems
    };
};

export const getBordas = () => {
    return dispatch => {
        dispatch(getBordasStart());
        axios.get('/bordas', { withCredentials: true })
        .then(response => {
            dispatch(getBordasSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getBordasError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getBordasError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getBordasError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postBordaStart = () => {
    return {
        type: BORDA.POST_BORDA_START
    };
};

export const postBordaError = (error) => {
    return {
        type: BORDA.POST_BORDA_ERROR,
        error: error
    };
};

export const postBordaSuccess = (data) => {
    return {
        type: BORDA.POST_BORDA_SUCCESS,
        borda: data.borda
    };
};

export const postBorda = (bordaData) => {
    return dispatch => {
        dispatch(postBordaStart());
        return axios.post('/bordas', bordaData, { withCredentials: true })
        .then(response => {
            dispatch(postBordaSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postBordaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postBordaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postBordaError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putBordaStart = () => {
    return {
        type: BORDA.PUT_BORDA_START
    };
};

export const putBordaError = (error) => {
    return {
        type: BORDA.PUT_BORDA_ERROR,
        error: error
    };
};

export const putBordaSuccess = (data) => {
    return {
        type: BORDA.PUT_BORDA_SUCCESS,
        borda: data.borda
    };
};

export const putBorda = (bordaId, bordaData) => {
    return dispatch => {
        dispatch(putBordaStart());
        return axios.put('/bordas/' + bordaId, bordaData, { withCredentials: true })
        .then(response => {
            dispatch(putBordaSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putBordaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putBordaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putBordaError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putBordaEnableStart = () => {
    return {
        type: BORDA.PUT_BORDA_ENABLE_START
    };
};

export const putBordaEnableError = (error) => {
    return {
        type: BORDA.PUT_BORDA_ENABLE_ERROR,
        error: error
    };
};

export const putBordaEnableSuccess = (data) => {
    return {
        type: BORDA.PUT_BORDA_ENABLE_SUCCESS,
        borda: data.borda
    };
};

export const putBordaEnable = (bordaId, bordaData) => {
    return dispatch => {
        dispatch(putBordaEnableStart());
        axios.put('/bordas/' + bordaId + '/enable', bordaData, { withCredentials: true })
        .then(response => {
            dispatch(putBordaEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putBordaEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putBordaEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putBordaEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deleteBordaStart = () => {
    return {
        type: BORDA.DELETE_BORDA_START
    };
};

export const deleteBordaError = (error) => {
    return {
        type: BORDA.DELETE_BORDA_ERROR,
        error: error
    };
};

export const deleteBordaSuccess = (bordaId) => {
    return {
        type: BORDA.DELETE_BORDA_SUCCESS,
        bordaId: bordaId
    };
};

export const deleteBorda = (bordaId) => {
    return dispatch => {
        dispatch(deleteBordaStart());
        return axios.delete('/bordas/' + bordaId, { withCredentials: true })
        .then(response => {
            dispatch(deleteBordaSuccess(bordaId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deleteBordaError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deleteBordaError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deleteBordaError({ code: null, message: error.message }));
              }
        });
    };
};