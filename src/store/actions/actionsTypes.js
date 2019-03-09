const AUTH = {
    REGISTER_START: 'AUTH_REGISTER_START',
    REGISTER_ERROR: 'AUTH_REGISTER_ERROR',
    REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
    SET_REDIRECT_PATH: 'AUTH_SET_REDIRECT_PATH',
    CONFIRM_START: 'AUTH_CONFIRM_START',
    CONFIRM_ERROR: 'AUTH_CONFIRM_ERROR',
    CONFIRM_SUCCESS: 'AUTH_CONFIRM_SUCCESS',
    LOGIN_START: 'AUTH_LOGIN_START',
    LOGIN_ERROR: 'AUTH_LOGIN_ERROR',
    LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    LOGIN_CHECK_FAIL: 'AUTH_LOGIN_CHECK_FAIL',
    LOGOUT_START: 'AUTH_LOGOUT_START',
    LOGOUT_ERROR: 'AUTH_LOGOUT_ERROR',
    LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
    FORGOT_START: 'AUTH_FORGOT_START',
    FORGOT_ERROR: 'AUTH_FORGOT_ERROR',
    FORGOT_SUCCESS: 'AUTH_FORGOT_SUCCESS',
    RESET_START: 'AUTH_RESET_START',
    RESET_ERROR: 'AUTH_RESET_ERROR',
    RESET_SUCCESS: 'AUTH_RESET_SUCCESS',
};

const USER = {
    SET_DATA: 'USER_SET_DATA',
    GET_PROFILE_START: 'USER_GET_PROFILE_START',
    GET_PROFILE_ERROR: 'USER_GET_PROFILE_ERROR',
    GET_PROFILE_SUCCESS: 'USER_GET_PROFILE_SUCCESS',
    POST_PROFILE_START: 'USER_POST_PROFILE_START',
    POST_PROFILE_ERROR: 'USER_POST_PROFILE_ERROR',
    POST_PROFILE_SUCCESS: 'USER_POST_PROFILE_SUCCESS'
}

const TAMANHO = {
    GET_TAMANHO_LIST_START: 'TAMANHO_GET_TAMANHO_LIST_START',
    GET_TAMANHO_LIST_ERROR: 'TAMANHO_GET_TAMANHO_LIST_ERROR',
    GET_TAMANHO_LIST_SUCCESS: 'TAMANHO_GET_TAMANHO_LIST_SUCCESS',
    POST_TAMANHO_START: 'TAMANHO_POST_TAMANHO_START',
    POST_TAMANHO_ERROR: 'TAMANHO_POST_TAMANHO_ERROR',
    POST_TAMANHO_SUCCESS: 'TAMANHO_POST_TAMANHO_SUCCES',
    PUT_TAMANHO_START: 'TAMANHO_PUT_TAMANHO_START',
    PUT_TAMANHO_ERROR: 'TAMANHO_PUT_TAMANHO_ERROR',
    PUT_TAMANHO_SUCCESS: 'TAMANHO_PUT_TAMANHO_SUCCES',
    PUT_TAMANHO_ENABLE_START: 'TAMANHO_PUT_TAMANHO_ENABLE_START',
    PUT_TAMANHO_ENABLE_ERROR: 'TAMANHO_PUT_TAMANHO_ENABLE_ERROR',
    PUT_TAMANHO_ENABLE_SUCCESS: 'TAMANHO_PUT_TAMANHO_ENABLE_SUCCES',
    DELETE_TAMANHO_START: 'TAMANHO_DELETE_TAMANHO_START',
    DELETE_TAMANHO_ERROR: 'TAMANHO_DELETE_TAMANHO_ERROR',
    DELETE_TAMANHO_SUCCESS: 'TAMANHO_DELETE_TAMANHO_SUCCES',
}

const SABOR = {
    GET_SABOR_LIST_START: 'SABOR_GET_SABOR_LIST_START',
    GET_SABOR_LIST_ERROR: 'SABOR_GET_SABOR_LIST_ERROR',
    GET_SABOR_LIST_SUCCESS: 'SABOR_GET_SABOR_LIST_SUCCESS',
    POST_SABOR_START: 'SABOR_POST_SABOR_START',
    POST_SABOR_ERROR: 'SABOR_POST_SABOR_ERROR',
    POST_SABOR_SUCCESS: 'SABOR_POST_SABOR_SUCCES',
    PUT_SABOR_START: 'SABOR_PUT_SABOR_START',
    PUT_SABOR_ERROR: 'SABOR_PUT_SABOR_ERROR',
    PUT_SABOR_SUCCESS: 'SABOR_PUT_SABOR_SUCCES',
    PUT_SABOR_ENABLE_START: 'SABOR_PUT_SABOR_ENABLE_START',
    PUT_SABOR_ENABLE_ERROR: 'SABOR_PUT_SABOR_ENABLE_ERROR',
    PUT_SABOR_ENABLE_SUCCESS: 'SABOR_PUT_SABOR_ENABLE_SUCCES',
    DELETE_SABOR_START: 'SABOR_DELETE_SABOR_START',
    DELETE_SABOR_ERROR: 'SABOR_DELETE_SABOR_ERROR',
    DELETE_SABOR_SUCCESS: 'SABOR_DELETE_SABOR_SUCCES',
}

const BORDA = {
    GET_BORDA_LIST_START: 'BORDA_GET_BORDA_LIST_START',
    GET_BORDA_LIST_ERROR: 'BORDA_GET_BORDA_LIST_ERROR',
    GET_BORDA_LIST_SUCCESS: 'BORDA_GET_BORDA_LIST_SUCCESS',
    POST_BORDA_START: 'BORDA_POST_BORDA_START',
    POST_BORDA_ERROR: 'BORDA_POST_BORDA_ERROR',
    POST_BORDA_SUCCESS: 'BORDA_POST_BORDA_SUCCES',
    PUT_BORDA_START: 'BORDA_PUT_BORDA_START',
    PUT_BORDA_ERROR: 'BORDA_PUT_BORDA_ERROR',
    PUT_BORDA_SUCCESS: 'BORDA_PUT_BORDA_SUCCES',
    PUT_BORDA_ENABLE_START: 'BORDA_PUT_BORDA_ENABLE_START',
    PUT_BORDA_ENABLE_ERROR: 'BORDA_PUT_BORDA_ENABLE_ERROR',
    PUT_BORDA_ENABLE_SUCCESS: 'BORDA_PUT_BORDA_ENABLE_SUCCES',
    DELETE_BORDA_START: 'BORDA_DELETE_BORDA_START',
    DELETE_BORDA_ERROR: 'BORDA_DELETE_BORDA_ERROR',
    DELETE_BORDA_SUCCESS: 'BORDA_DELETE_BORDA_SUCCES',
}

const ADICIONAL = {
    GET_ADICIONAL_LIST_START: 'ADICIONAL_GET_ADICIONAL_LIST_START',
    GET_ADICIONAL_LIST_ERROR: 'ADICIONAL_GET_ADICIONAL_LIST_ERROR',
    GET_ADICIONAL_LIST_SUCCESS: 'ADICIONAL_GET_ADICIONAL_LIST_SUCCESS',
    POST_ADICIONAL_START: 'ADICIONAL_POST_ADICIONAL_START',
    POST_ADICIONAL_ERROR: 'ADICIONAL_POST_ADICIONAL_ERROR',
    POST_ADICIONAL_SUCCESS: 'ADICIONAL_POST_ADICIONAL_SUCCES',
    PUT_ADICIONAL_START: 'ADICIONAL_PUT_ADICIONAL_START',
    PUT_ADICIONAL_ERROR: 'ADICIONAL_PUT_ADICIONAL_ERROR',
    PUT_ADICIONAL_SUCCESS: 'ADICIONAL_PUT_ADICIONAL_SUCCES',
    PUT_ADICIONAL_ENABLE_START: 'ADICIONAL_PUT_ADICIONAL_ENABLE_START',
    PUT_ADICIONAL_ENABLE_ERROR: 'ADICIONAL_PUT_ADICIONAL_ENABLE_ERROR',
    PUT_ADICIONAL_ENABLE_SUCCESS: 'ADICIONAL_PUT_ADICIONAL_ENABLE_SUCCES',
    DELETE_ADICIONAL_START: 'ADICIONAL_DELETE_ADICIONAL_START',
    DELETE_ADICIONAL_ERROR: 'ADICIONAL_DELETE_ADICIONAL_ERROR',
    DELETE_ADICIONAL_SUCCESS: 'ADICIONAL_DELETE_ADICIONAL_SUCCES',
}

const CLIENTE = {
    GET_CLIENTE_LIST_START: 'CLIENTE_GET_CLIENTE_LIST_START',
    GET_CLIENTE_LIST_ERROR: 'CLIENTE_GET_CLIENTE_LIST_ERROR',
    GET_CLIENTE_LIST_SUCCESS: 'CLIENTE_GET_CLIENTE_LIST_SUCCESS',
    POST_CLIENTE_START: 'CLIENTE_POST_CLIENTE_START',
    POST_CLIENTE_ERROR: 'CLIENTE_POST_CLIENTE_ERROR',
    POST_CLIENTE_SUCCESS: 'CLIENTE_POST_CLIENTE_SUCCES',
    PUT_CLIENTE_START: 'CLIENTE_PUT_CLIENTE_START',
    PUT_CLIENTE_ERROR: 'CLIENTE_PUT_CLIENTE_ERROR',
    PUT_CLIENTE_SUCCESS: 'CLIENTE_PUT_CLIENTE_SUCCES',
    PUT_CLIENTE_ENABLE_START: 'CLIENTE_PUT_CLIENTE_ENABLE_START',
    PUT_CLIENTE_ENABLE_ERROR: 'CLIENTE_PUT_CLIENTE_ENABLE_ERROR',
    PUT_CLIENTE_ENABLE_SUCCESS: 'CLIENTE_PUT_CLIENTE_ENABLE_SUCCES',
    DELETE_CLIENTE_START: 'CLIENTE_DELETE_CLIENTE_START',
    DELETE_CLIENTE_ERROR: 'CLIENTE_DELETE_CLIENTE_ERROR',
    DELETE_CLIENTE_SUCCESS: 'CLIENTE_DELETE_CLIENTE_SUCCES',
}

export {
    AUTH, USER, TAMANHO, SABOR, BORDA, ADICIONAL, CLIENTE
};