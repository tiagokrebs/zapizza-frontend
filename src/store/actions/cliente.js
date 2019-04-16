import axios from '../../shared/axios-auth';
import axiosApis from '../../shared/axios';

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

export const getClientes = (start, pageSize, sortField, sortOrder, filterFields) => {
    return dispatch => {
        dispatch(getClientesStart());
        axios.get('/clientes', { 
            params: {
                q: 'list',
                start: start,
                size: pageSize,
                sort: sortField,
                order: sortOrder,
                ...filterFields
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

// Obtem dados do cliente
export const getClienteStart = () => {
    return {
        type: CLIENTE.GET_CLIENTE_START
    };
};

export const getClienteError = (error) => {
    return {
        type: CLIENTE.GET_CLIENTE_ERROR,
        error: error
    };
};

export const getClienteSuccess = () => {
    return {
        type: CLIENTE.GET_CLIENTE_SUCCESS
    };
};

export const getCliente = (hashId) => {
    return dispatch => {
        dispatch(getClienteStart());
        return axios.get('/clientes/' + hashId, {
            withCredentials: true 
        })
        .then(response => {
            dispatch(getClienteSuccess());
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getClienteError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getClienteError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getClienteError({ code: null, message: error.message }));
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

// Pesquisa CEP
export const pesquisaCepStart = () => {
    return {
        type: CLIENTE.PESQUISA_CEP_START
    };
};

export const pesquisaCepError = () => {
    return {
        type: CLIENTE.PESQUISA_CEP_ERROR
    };
};

export const pesquisaCepSuccess = () => {
    return {
        type: CLIENTE.PESQUISA_CEP_SUCCESS
    };
};

export const pesquisaCep = (targetId, cep) => {
    return dispatch => {
        dispatch(pesquisaCepStart());
        return axiosApis.get('https://viacep.com.br/ws/' + cep + '/json/', {
            params: {
                cep: cep
            }
        })
        .then(response => {
            dispatch(pesquisaCepSuccess());
            return {
                targetId: targetId,
                ...response.data
            }
        })
        .catch(error => {
            dispatch(pesquisaCepError());
            throw error
        });
    };
};

/* Pesquisa cliente em componentes AsyncSelect (react-select)
requer o retorno de uma promisse
*/
export const selectClienteStart = () => {
    return {
        type: CLIENTE.SELECT_CLIENTE_START
    };
};

export const selectClienteError = (error) => {
    return {
        type: CLIENTE.SELECT_CLIENTE_ERROR,
        error: error
    };
};

export const selectClienteSuccess = () => {
    return {
        type: CLIENTE.SELECT_CLIENTE_SUCCESS,
    };
};

export const selectCliente = (nome, telefone) => {
    return dispatch => {
        dispatch(selectClienteStart());
        return axios.get('/clientes', { 
            params: {
                q: 'select',
                size: 20,
                nome: nome,
                telefone: telefone
            },
            withCredentials: true 
        })
        .then(response => {
            dispatch(selectClienteSuccess());
            return response.data.data.clientes;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(selectClienteError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(selectClienteError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(selectClienteError({ code: null, message: error.message }));
              }
        });
    };
};