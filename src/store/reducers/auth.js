import { AUTH } from '../actions/actionsTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    success: null,
    loading: false,
    authRedirectPath: '/',
    isAuthenticated: false
};

// Registro
const registerStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        success: null,
        loading: true
    });
};

const registerError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false, 
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        success: action.success,
        loading: false,
    });
};

// Redirect path login
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

// Confirma registro
const confirmStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        success: null,
        loading: true
    });
};

const confirmError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false
    });
};

const confirmSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        success: action.success,
        loading: false
    });
};

// Login
const loginStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        success: null,
        loading: true
    });
};

const loginError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        success: action.success,
        loading: false,
        userId: action.userId,
        idToken: action.idToken,
        isAuthenticated: true
    });
};

// Logout
const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        idToken: null,
        isAuthenticated: false
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
        case AUTH.LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;