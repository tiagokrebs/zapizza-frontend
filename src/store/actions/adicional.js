import axios from '../../shared/axios-auth';

import { ADICIONAL } from './actionsTypes';

// Lista
export const getAdicionaisStart = () => {
    return {
        type: ADICIONAL.GET_ADICIONAL_LIST_START
    };
};

export const getAdicionaisError = (error) => {
    return {
        type: ADICIONAL.GET_ADICIONAL_LIST_ERROR,
        error: error
    };
};

export const getAdicionaisSuccess = (data) => {
    return {
        type: ADICIONAL.GET_ADICIONAL_LIST_SUCCESS,
        adicionais: data.adicionais,
        totalItems: data.totalItems
    };
};

export const getAdicionais = () => {
    return dispatch => {
        dispatch(getAdicionaisStart());
        axios.get('/adicionais', { withCredentials: true })
        .then(response => {
            dispatch(getAdicionaisSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getAdicionaisError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getAdicionaisError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getAdicionaisError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postAdicionalStart = () => {
    return {
        type: ADICIONAL.POST_ADICIONAL_START
    };
};

export const postAdicionalError = (error) => {
    return {
        type: ADICIONAL.POST_ADICIONAL_ERROR,
        error: error
    };
};

export const postAdicionalSuccess = (data) => {
    return {
        type: ADICIONAL.POST_ADICIONAL_SUCCESS,
        adicional: data.adicional
    };
};

export const postAdicional = (adicionalData) => {
    return dispatch => {
        dispatch(postAdicionalStart());
        return axios.post('/adicionais', adicionalData, { withCredentials: true })
        .then(response => {
            dispatch(postAdicionalSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postAdicionalError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postAdicionalError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postAdicionalError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putAdicionalStart = () => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_START
    };
};

export const putAdicionalError = (error) => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_ERROR,
        error: error
    };
};

export const putAdicionalSuccess = (data) => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_SUCCESS,
        adicional: data.adicional
    };
};

export const putAdicional = (adicionalId, adicionalData) => {
    return dispatch => {
        dispatch(putAdicionalStart());
        return axios.put('/adicionais/' + adicionalId, adicionalData, { withCredentials: true })
        .then(response => {
            dispatch(putAdicionalSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putAdicionalError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putAdicionalError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putAdicionalError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putAdicionalEnableStart = () => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_ENABLE_START
    };
};

export const putAdicionalEnableError = (error) => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_ENABLE_ERROR,
        error: error
    };
};

export const putAdicionalEnableSuccess = (data) => {
    return {
        type: ADICIONAL.PUT_ADICIONAL_ENABLE_SUCCESS,
        adicional: data.adicional
    };
};

export const putAdicionalEnable = (adicionalId, adicionalData) => {
    return dispatch => {
        dispatch(putAdicionalEnableStart());
        axios.put('/adicionais/' + adicionalId + '/enable', adicionalData, { withCredentials: true })
        .then(response => {
            dispatch(putAdicionalEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putAdicionalEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putAdicionalEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putAdicionalEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deleteAdicionalStart = () => {
    return {
        type: ADICIONAL.DELETE_ADICIONAL_START
    };
};

export const deleteAdicionalError = (error) => {
    return {
        type: ADICIONAL.DELETE_ADICIONAL_ERROR,
        error: error
    };
};

export const deleteAdicionalSuccess = (adicionalId) => {
    return {
        type: ADICIONAL.DELETE_ADICIONAL_SUCCESS,
        adicionalId: adicionalId
    };
};

export const deleteAdicional = (adicionalId) => {
    return dispatch => {
        dispatch(deleteAdicionalStart());
        return axios.delete('/adicionais/' + adicionalId, { withCredentials: true })
        .then(response => {
            dispatch(deleteAdicionalSuccess(adicionalId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deleteAdicionalError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deleteAdicionalError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deleteAdicionalError({ code: null, message: error.message }));
              }
        });
    };
};