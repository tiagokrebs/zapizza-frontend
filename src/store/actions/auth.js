import axios from '../../shared/axios-auth';

import { AUTH } from './actionsTypes';
import { setUserData } from './user';

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
        message: data.message
    };
};

// Retorna funcao sincrona para 
export const register = (registerData) => {
    return dispatch => {
        dispatch(registerStart());
        return axios.post('/signup', registerData)
        .then(response => {
            dispatch(registerSuccess(response.data.data));
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(registerError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(registerError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(registerError({ code: null, message: error.message }));
              }
        });  
    };
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
        message: data.message
    };
};

export const confirm = (token) => {
    return dispatch => {
        dispatch(confirmStart());
        axios.post('/confirm', {
            token: token
        }, {
            withCredentials: true
        })
        .then(response => {
            dispatch(confirmSuccess(response.data.data));
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(confirmError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(confirmError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(confirmError({ code: null, message: error.message }));
              }
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
        // userId: data.userId,
        message: data.message,
        emailConfirmed: data.emailConfirmed
    };
};

export const login = (loginData) => dispatch => {
        dispatch(loginStart());
        axios.post('/login', 
        loginData, {
            withCredentials: true
        })
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.data.expiresIn * 1000);
                localStorage.setItem('idToken', response.data.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.data.userId);
                localStorage.setItem('USER', JSON.stringify({
                    userId: response.data.data.userId,
                    emailConfirmed: response.data.data.emailConfirmed,
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName
                }));
                dispatch(loginSuccess(response.data.data));
                dispatch(setUserData(response.data.data));
            })
            .catch(error => {
                if (error.response) {
                    // Request enviado e resposta do servidor com status erro
                    dispatch(loginError(error.response.data.error));
                  } else if (error.request && !error.status) {
                    // Request enviado sem resposta do servidor
                    dispatch(loginError({ code: null, message: error.message }));
                  } else {
                    // Algo aconteceu na criacao do request e gerou um erro
                    dispatch(loginError({ code: null, message: error.message }));
                  }
            });
};

// Logout
export const logoutStart = () => {
    return {
        type: AUTH.LOGOUT_START
    };
};

export const logoutError = (error) => {
    return {
        type: AUTH.LOGOUT_ERROR,
        error: error
    };
};

export const logoutSuccess = () => {
    return {
        type: AUTH.LOGOUT_SUCCESS
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(logoutStart());
        axios.get('/logout', { withCredentials: true })
            .then(response => {
                localStorage.removeItem('idToken');
                localStorage.removeItem('expirationDate');
                localStorage.removeItem('USER');
                dispatch(logoutSuccess());
            })
            .catch(error => {
                if (error.response) {
                    // Request enviado e resposta do servidor com status erro
                    dispatch(logoutError(error.response.data.error));
                  } else if (error.request && !error.status) {
                    // Request enviado sem resposta do servidor
                    dispatch(logoutError({ code: null, message: error.message }));
                  } else {
                    // Algo aconteceu na criacao do request e gerou um erro
                    dispatch(logoutError({ code: null, message: error.message }));
                  }
            });
    };
};

// Login check
export const loginCheck = () => dispatch => new Promise ((resolve, reject) => {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!localStorage.getItem('idToken') || !localStorage.getItem('USER')){
            dispatch(logoutSuccess());
        } else if (localStorage.getItem('idToken') && localStorage.getItem('idToken') && expirationDate > new Date()) {
            const strObject = localStorage.getItem('USER');
            const storage = JSON.parse(strObject);
            // dispatch(loginSuccess({userId: localStorage.getItem('userId'), idToken: localStorage.getItem('idToken') }))
            dispatch(loginSuccess({ userId: storage.userId, idToken: localStorage.getItem('idToken') }))
            dispatch(setUserData({
                userId: storage.userId,
                emailConfirmed: storage.emailConfirmed,
                firstName: storage.firstName,
                lastName: storage.lastName
            }));
        } else {
            dispatch(loginStart());
            axios.get('/authenticated', { withCredentials: true })
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.data.expiresIn * 1000);
                localStorage.setItem('idToken', response.data.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.data.userId);
                localStorage.setItem('USER', JSON.stringify({
                    userId: response.data.data.userId,
                    emailConfirmed: response.data.data.emailConfirmed,
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName
                }));
                dispatch(loginSuccess(response.data.data));
                dispatch(setUserData(response.data.data));
            })
            .catch(error => {
                if (error.response) {
                    // Request enviado e resposta do servidor com status erro
                    dispatch(loginError(error.response.data.error));
                    } else if (error.request && !error.status) {
                    // Request enviado sem resposta do servidor
                    dispatch(loginError({ code: null, message: error.message }));
                    } else {
                    // Algo aconteceu na criacao do request e gerou um erro
                    dispatch(loginError({ code: null, message: error.message }));
                    }
            });
        }
        resolve();
});

// esqueci a senha
export const forgotStart = () => {
    return {
        type: AUTH.FORGOT_START
    };
};

export const forgotError = (error) => {
    return {
        type: AUTH.FORGOT_ERROR,
        error: error
    };
};

export const forgotSuccess = (data) => {
    return {
        type: AUTH.FORGOT_SUCCESS,
        message: data.message
    };
};

// Retorna funcao sincrona para 
export const forgot = (forgotData) => {
    return dispatch => {
        dispatch(forgotStart());
        return axios.post('/forgot', forgotData)
        .then(response => {
            dispatch(forgotSuccess(response.data.data));
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(forgotError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(forgotError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(forgotError({ code: null, message: error.message }));
              }
        });  
    };
};

// redefinir a senha
export const resetStart = () => {
    return {
        type: AUTH.RESET_START
    };
};

export const resetError = (error) => {
    return {
        type: AUTH.RESET_ERROR,
        error: error
    };
};

export const resetSuccess = (data) => {
    return {
        type: AUTH.RESET_SUCCESS,
        message: data.message
    };
};

// Retorna funcao sincrona para 
export const reset = (resetData) => {
    return dispatch => {
        dispatch(resetStart());
        return axios.post('/reset', resetData)
        .then(response => {
            dispatch(resetSuccess(response.data.data));
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(resetError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(resetError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(resetError({ code: null, message: error.message }));
              }
        });  
    };
};