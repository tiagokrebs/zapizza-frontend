import { USER } from '../actions/actionsTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    userId: null,
    emailConfirmed: null,
    firstName: null,
    lastName: null,
    profile: {
        api: {
            pending: false,
            error: null
        }
    }
}

export const setUserData = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        emailConfirmed: action.emailConfirmed,
        firstName: action.firstName,
        lastName: action.lastName
    });
}

const getProfileStart = (state, action) => {
    const api = { pending: true, error: null }
    const profile = { profile: { api: api }}
    return updateObject(state, profile);
};

const getProfileError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const profile = { profile: { api: api }};
    return updateObject(state, profile);
};

const getProfileSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const profile = { profile: { api: api }}
    return updateObject(state, profile);
};

const postProfileStart = (state, action) => {
    const api = { pending: true, error: null }
    const profile = { profile: { api: api }}
    return updateObject(state, profile);
};

const postProfileError = (state, action) => {
    const error = action.error;
    const api = { pending: false, error: error };
    const profile = { profile: { api: api }};
    return updateObject(state, profile);
};

const postProfileSuccess = (state, action) => {
    const api = { pending: false, error: null }
    const profile = { profile: { api: api, message: action.message, code: action.code }}
    return updateObject(state, profile);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER.SET_DATA: return setUserData(state, action);
        case USER.GET_PROFILE_START: return getProfileStart(state, action);
        case USER.GET_PROFILE_ERROR: return getProfileError(state, action);
        case USER.GET_PROFILE_SUCCESS: return getProfileSuccess(state, action);
        case USER.POST_PROFILE_START: return postProfileStart(state, action);
        case USER.POST_PROFILE_ERROR: return postProfileError(state, action);
        case USER.POST_PROFILE_SUCCESS: return postProfileSuccess(state, action);
        default: return state;
    }
};

export default reducer;