import axios from '../../shared/axios-auth';

import { PEDIDO } from './actionsTypes';

// Lista
export const getPedidosStart = () => {
    return {
        type: PEDIDO.GET_PEDIDO_LIST_START
    };
};

export const getPedidosError = (error) => {
    return {
        type: PEDIDO.GET_PEDIDO_LIST_ERROR,
        error: error
    };
};

export const getPedidosSuccess = (data) => {
    return {
        type: PEDIDO.GET_PEDIDO_LIST_SUCCESS,
        pedidos: data.pedidos,
        totalItems: data.totalItems
    };
};

export const getPedidos = (start, pageSize, sortField, sortOrder, filterFields) => {
    return dispatch => {
        dispatch(getPedidosStart());
        axios.get('/pedidos', { 
            params: {
                start: start,
                size: pageSize,
                sort: sortField,
                order: sortOrder,
                ...filterFields
            },
            withCredentials: true 
        })
        .then(response => {
            dispatch(getPedidosSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getPedidosError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getPedidosError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getPedidosError({ code: null, message: error.message }));
              }
        });
    };
};

// Inserção
export const postPedidoStart = () => {
    return {
        type: PEDIDO.POST_PEDIDO_START
    };
};

export const postPedidoError = (error) => {
    return {
        type: PEDIDO.POST_PEDIDO_ERROR,
        error: error
    };
};

export const postPedidoSuccess = (data) => {
    return {
        type: PEDIDO.POST_PEDIDO_SUCCESS,
        pedido: data.pedido
    };
};

export const postPedido = (pedidoData) => {
    return dispatch => {
        dispatch(postPedidoStart());
        return axios.post('/pedidos', pedidoData, { withCredentials: true })
        .then(response => {
            dispatch(postPedidoSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postPedidoError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postPedidoError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postPedidoError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Alteração
export const putPedidoStart = () => {
    return {
        type: PEDIDO.PUT_PEDIDO_START
    };
};

export const putPedidoError = (error) => {
    return {
        type: PEDIDO.PUT_PEDIDO_ERROR,
        error: error
    };
};

export const putPedidoSuccess = (data) => {
    return {
        type: PEDIDO.PUT_PEDIDO_SUCCESS,
        pedido: data.pedido
    };
};

export const putPedido = (pedidoId, pedidoData) => {
    return dispatch => {
        dispatch(putPedidoStart());
        return axios.put('/pedidos/' + pedidoId, pedidoData, { withCredentials: true })
        .then(response => {
            dispatch(putPedidoSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putPedidoError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putPedidoError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putPedidoError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });
    };
};

// Ativar/Desativar
export const putPedidoEnableStart = () => {
    return {
        type: PEDIDO.PUT_PEDIDO_ENABLE_START
    };
};

export const putPedidoEnableError = (error) => {
    return {
        type: PEDIDO.PUT_PEDIDO_ENABLE_ERROR,
        error: error
    };
};

export const putPedidoEnableSuccess = (data) => {
    return {
        type: PEDIDO.PUT_PEDIDO_ENABLE_SUCCESS,
        pedido: data.pedido
    };
};

export const putPedidoEnable = (pedidoId, pedidoData) => {
    return dispatch => {
        dispatch(putPedidoEnableStart());
        axios.put('/pedidos/' + pedidoId + '/enable', pedidoData, { withCredentials: true })
        .then(response => {
            dispatch(putPedidoEnableSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(putPedidoEnableError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(putPedidoEnableError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(putPedidoEnableError({ code: null, message: error.message }));
              }
        });
    };
};

// Deletar
export const deletePedidoStart = () => {
    return {
        type: PEDIDO.DELETE_PEDIDO_START
    };
};

export const deletePedidoError = (error) => {
    return {
        type: PEDIDO.DELETE_PEDIDO_ERROR,
        error: error
    };
};

export const deletePedidoSuccess = (pedidoId) => {
    return {
        type: PEDIDO.DELETE_PEDIDO_SUCCESS,
        pedidoId: pedidoId
    };
};

export const deletePedido = (pedidoId) => {
    return dispatch => {
        dispatch(deletePedidoStart());
        return axios.delete('/pedidos/' + pedidoId, { withCredentials: true })
        .then(response => {
            dispatch(deletePedidoSuccess(pedidoId));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(deletePedidoError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(deletePedidoError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(deletePedidoError({ code: null, message: error.message }));
              }
        });
    };
};
