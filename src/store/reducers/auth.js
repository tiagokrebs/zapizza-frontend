import { AUTH } from '../actions/actionsTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    api: {
        pending: false,
        error: null,
    },
    idToken: null,
    userId: null,
    authRedirectPath: "/",
    isAuthenticated: false,
    emailConfirmed: false,
    register: {
        api: {
            pending: false,
            error: null
        }
    },
    confirm: {
        api: {
            pending: false,
            error: null
        }
    },
    login: {
        api: {
            pending: false,
            error: null
        }
    },
    logout: {
        api: {
            pending: false,
            error: null
        }
    }
};

// Registro
const registerStart = (state, action) => {
    const api = { pending: true, error: null }
    const register = { register: { api: api }}
    return updateObject(state, register);
};

const registerError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const register = { register: { api: api }};
    return updateObject(state, register);
};

const registerSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const register = { register: { api: api, message: action.message }}
    return updateObject(state, register);
};

// Redirect path login
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

// Confirma registro
const confirmStart = (state, action) => {
    const api = { pending: true, error: null }
    const confirm = { confirm: { api: api }}
    return updateObject(state, confirm);
};

const confirmError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const confirm = { confirm: { api: api }};
    return updateObject(state, confirm);
};

const confirmSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const confirm = { confirm: { api: api, message: action.message }}
    return updateObject(state, confirm);
};

// Login
const loginStart = (state, action) => {
    const api = { pending: true, error: null }
    return updateObject(state, {
        api: api
    });
};

const loginError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    return updateObject(state, {
        api: api
    });
};

const loginSuccess = (state, action) => {
    const api = { pending: false, error: null }
    return updateObject(state, {
        api: api,
        idToken: action.idToken,
        isAuthenticated: true,
        userId: action.userId,
        message: action.message,
        emailConfirmed: action.emailConfirmed
    });
};

// Logout
const logoutStart = (state, action) => {
    const api = { pending: true, error: null }
    const logout = { logout: { api: api }}
    return updateObject(state, logout);
};

const logoutError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const logout = { logout: { api: api }};
    return updateObject(state, logout);
};

const logoutSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const logout = { logout: { api: api, message: action.message }}
    return updateObject(state, {
        userId: null,
        idToken: null,
        isAuthenticated: false,
        emailConfirmed: false,
        logout: logout
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.REGISTER_START: return registerStart(state, action);
        case AUTH.REGISTER_ERROR: return registerError(state, action);
        case AUTH.REGISTER_SUCCESS: return registerSuccess(state, action);
        case AUTH.SET_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case AUTH.CONFIRM_START: return confirmStart(state, action);
        case AUTH.CONFIRM_ERROR: return confirmError(state, action);
        case AUTH.CONFIRM_SUCCESS: return confirmSuccess(state, action);
        case AUTH.LOGIN_START: return loginStart(state, action);
        case AUTH.LOGIN_ERROR: return loginError(state, action);
        case AUTH.LOGIN_SUCCESS: return loginSuccess(state, action);
        case AUTH.LOGOUT_START: return logoutStart(state, action);
        case AUTH.LOGOUT_ERROR: return logoutError(state, action);
        case AUTH.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        default: return state;
    }
};

export default reducer;