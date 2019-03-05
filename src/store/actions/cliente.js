import axios from '../../shared/axios-auth';

import { CLIENTE } from './actionsTypes';

// Lista
export const getClientesStart = () => {
    return {
        type: CLIENTE.GET_CLIENTE_LIST_START
    };
};

export const getClientesError = (error) => {
    return {
        type: CLIENTE.GET_CLIENTE_LIST_ERROR,
        error: error
    };
};

export const getClientesSuccess = (data) => {
    return {
        type: CLIENTE.GET_CLIENTE_LIST_SUCCESS,
        clientes: data.clientes,
        totalItems: data.totalItems
    };
};

export const getClientes = (start, pageSize, sortField, sortOrder) => {
    return dispatch => {
        dispatch(getClientesStart());
        axios.get('/clientes', { 
            params: {
                start: start,
                size: pageSize,
                sort: sortField,
                order: sortOrder
            },
            withCredentials: true 
        })
        .then(response => {
            dispatch(getClientesSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getClientesError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getClientesError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getClientesError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postClienteStart = () => {
    return {
        type: CLIENTE.POST_CLIENTE_START
    };
};

export const postClienteError = (error) => {
    return {
        type: CLIENTE.POST_CLIENTE_ERROR,
        error: error
    };
};

export const postClienteSuccess = (data) => {
    return {
        type: CLIENTE.POST_CLIENTE_SUCCESS,
        cliente: data.cliente
    };
};

export const postCliente = (clienteData) => {
    return dispatch => {
        dispatch(postClienteStart());
        return axios.post('/clientes', clienteData, { withCredentials: true })
        .then(response => {
            dispatch(postClienteSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postClienteError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postClienteError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postClienteError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putClienteStart = () => {
    return {
        type: CLIENTE.PUT_CLIENTE_START
    };
};

export const putClienteError = (error) => {
    return {
        type: CLIENTE.PUT_CLIENTE_ERROR,
        error: error
    };
};

export const putClienteSuccess = (data) => {
    return {
        type: CLIENTE.PUT_CLIENTE_SUCCESS,
        cliente: data.cliente
    };
};

export const putCliente = (clienteId, clienteData) => {
    return dispatch => {
        dispatch(putClienteStart());
        return axios.put('/clientes/' + clienteId, clienteData, { withCredentials: true })
        .then(response => {
            dispatch(putClienteSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putClienteError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putClienteError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putClienteError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putClienteEnableStart = () => {
    return {
        type: CLIENTE.PUT_CLIENTE_ENABLE_START
    };
};

export const putClienteEnableError = (error) => {
    return {
        type: CLIENTE.PUT_CLIENTE_ENABLE_ERROR,
        error: error
    };
};

export const putClienteEnableSuccess = (data) => {
    return {
        type: CLIENTE.PUT_CLIENTE_ENABLE_SUCCESS,
        cliente: data.cliente
    };
};

export const putClienteEnable = (clienteId, clienteData) => {
    return dispatch => {
        dispatch(putClienteEnableStart());
        axios.put('/clientes/' + clienteId + '/enable', clienteData, { withCredentials: true })
        .then(response => {
            dispatch(putClienteEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putClienteEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putClienteEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putClienteEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deleteClienteStart = () => {
    return {
        type: CLIENTE.DELETE_CLIENTE_START
    };
};

export const deleteClienteError = (error) => {
    return {
        type: CLIENTE.DELETE_CLIENTE_ERROR,
        error: error
    };
};

export const deleteClienteSuccess = (clienteId) => {
    return {
        type: CLIENTE.DELETE_CLIENTE_SUCCESS,
        clienteId: clienteId
    };
};

export const deleteCliente = (clienteId) => {
    return dispatch => {
        dispatch(deleteClienteStart());
        return axios.delete('/clientes/' + clienteId, { withCredentials: true })
        .then(response => {
            dispatch(deleteClienteSuccess(clienteId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deleteClienteError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deleteClienteError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deleteClienteError({ code: null, message: error.message }));
              }
        });
    };
};