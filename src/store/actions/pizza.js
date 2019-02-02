import axios from '../../shared/axios-auth';

import { PIZZA } from './actionsTypes';

// Lista
export const getTamanhosStart = () => {
    return {
        type: PIZZA.GET_TAMANHO_LIST_START
    };
};

export const getTamanhosError = (error) => {
    return {
        type: PIZZA.GET_TAMANHO_LIST_ERROR,
        error: error
    };
};

export const getTamanhosSuccess = (data) => {
    return {
        type: PIZZA.GET_TAMANHO_LIST_SUCCESS,
        tamanhos: data.tamanhos
    };
};

export const getTamanhos = () => {
    return dispatch => {
        dispatch(getTamanhosStart());
        axios.get('/tamanhos', { withCredentials: true })
        .then(response => {
            dispatch(getTamanhosSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getTamanhosError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getTamanhosError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getTamanhosError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postTamanhoStart = () => {
    return {
        type: PIZZA.POST_TAMANHO_START
    };
};

export const postTamanhoError = (error) => {
    return {
        type: PIZZA.POST_TAMANHO_ERROR,
        error: error
    };
};

export const postTamanhoSuccess = (data) => {
    return {
        type: PIZZA.POST_TAMANHO_SUCCESS,
        tamanho: data.tamanho
    };
};

export const postTamanho = (tamanhoData) => {
    return dispatch => {
        dispatch(postTamanhoStart());
        return axios.post('/tamanhos', tamanhoData, { withCredentials: true })
        .then(response => {
            dispatch(postTamanhoSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postTamanhoError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postTamanhoError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postTamanhoError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putTamanhoStart = () => {
    return {
        type: PIZZA.PUT_TAMANHO_START
    };
};

export const putTamanhoError = (error) => {
    return {
        type: PIZZA.PUT_TAMANHO_ERROR,
        error: error
    };
};

export const putTamanhoSuccess = (data) => {
    return {
        type: PIZZA.PUT_TAMANHO_SUCCESS,
        tamanho: data.tamanho
    };
};

export const putTamanho = (tamanhoId, tamanhoData) => {
    return dispatch => {
        dispatch(putTamanhoStart());
        return axios.put('/tamanhos/' + tamanhoId, tamanhoData, { withCredentials: true })
        .then(response => {
            dispatch(putTamanhoSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putTamanhoError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putTamanhoError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putTamanhoError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};