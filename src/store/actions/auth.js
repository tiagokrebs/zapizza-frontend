import axios from '../../shared/axios-auth';

import { AUTH } from './actionsTypes';

// Registro
export const registerStart = () => {
    return {
        type: AUTH.REGISTER_START
    };
};

export const registerError = (error) => {
    return {
        type: AUTH.REGISTER_ERROR,
        error: error
    };
};

export const registerSuccess = (data) => {
    return {
        type: AUTH.REGISTER_SUCCESS,
        success: data
    };
};

export const register = (registerData) => {
    return dispatch => {
        dispatch(registerStart());
        axios.post('/api/signup', registerData)
        .then(response => {
            dispatch(registerSuccess(response.data.data));
        })
        .catch(error => {
            dispatch(registerError(error.response.data.error));
        });
    }
};

// Confirma registro
export const confirmStart = () => {
    return {
        type: AUTH.CONFIRM_START
    };
};

export const confirmError = (error) => {
    return {
        type: AUTH.CONFIRM_ERROR,
        error: error
    };
};

export const confirmSuccess = (data) => {
    return {
        type: AUTH.CONFIRM_SUCCESS,
        success: data
    };
};

export const confirm = (token) => {
    return dispatch => {
        dispatch(confirmStart());
        axios.post('/api/confirm/' + token)
        .then(response => {
            dispatch(confirmSuccess(response.data.data));
        })
        .catch(error => {
            dispatch(confirmError(error.response.data.error));
        });
    }
};

// Redirect path login
export const setAuthRedirectPath = (path) => {
    return {
        type: AUTH.SET_REDIRECT_PATH,
        path: path
    };
};

// Login
export const loginStart = () => {
    return {
        type: AUTH.LOGIN_START
    };
};

export const loginError = (error) => {
    return {
        type: AUTH.LOGIN_ERROR,
        error: error
    };
};

export const loginSuccess = (data) => {

    return {
        type: AUTH.LOGIN_SUCCESS,
        idToken: data.idToken,
        userId: data.userId
    };
};

export const login = (loginData) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post('/api/login', loginData, { withCredentials: true })
            .then(response => {
                localStorage.setItem('idToken', response.data.data.idToken);
                localStorage.setItem('userId', response.data.data.userId);
                dispatch(loginSuccess(response.data.data))
            })
            .catch(error => {
                dispatch(loginError(error.response.data.error));
            });
    };
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: AUTH.LOGOUT
    };
};

// Garantia de autenticacao
export const loginCheck = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {
            dispatch(logout());
        } else {
            dispatch(loginStart());
            axios.get('/api/authenticated', { withCredentials: true })
            .then(response => {
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('userId', response.data.userId);
                dispatch(loginSuccess(response.data.data))
            })
            .catch(error => {
                dispatch(loginError(error.response.data.error));
                dispatch(logout());
            });
        }
    };
};