import axios from '../../shared/axios-auth';

import { PIZZA } from './actionsTypes';

export const getTamanhosStart = () => {
    return {
        type: PIZZA.GET_TAMANHOS_START
    };
};

export const getTamanhosError = (error) => {
    return {
        type: PIZZA.GET_TAMANHOS_ERROR,
        error: error
    };
};

export const getTamanhosSuccess = (data) => {
    return {
        type: PIZZA.GET_TAMANHOS_SUCCESS,
        tamanhos: data.tamanhos
    };
};

// Retorna funcao sincrona para obter dados da profile
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