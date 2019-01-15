import axios from '../../shared/axios-auth';

import { USER } from './actionsTypes';

export const setUserData = (data) => {
    return {
        type: USER.SET_DATA,
        userId: data.userId,
        emailConfirmed: data.emailConfirmed,
        firstName: data.firstName,
        lastName: data.lastName
    };
};

export const getProfileStart = () => {
    return {
        type: USER.GET_PROFILE_START
    };
};

export const getProfileError = (error) => {
    return {
        type: USER.GET_PROFILE_ERROR,
        error: error
    };
};

export const getProfileSuccess = () => {
    return {
        type: USER.GET_PROFILE_SUCCESS
    };
};

// Retorna funcao sincrona para obter dados da profile
export const getProfile = (username) => {
    return dispatch => {
        dispatch(getProfileStart());
        return axios.get('/user/' + username + '/profile', { withCredentials: true })
        .then(response => {
            dispatch(getProfileSuccess());
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(getProfileError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(getProfileError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(getProfileError({ code: null, message: error.message }));
              }
        });
    };
};

export const postProfileStart = () => {
    return {
        type: USER.POST_PROFILE_START
    };
};

export const postProfileError = (error) => {
    return {
        type: USER.POST_PROFILE_ERROR,
        error: error
    };
};

export const postProfileSuccess = (data) => {
    return {
        type: USER.POST_PROFILE_SUCCESS,
        message: data.message,
        code: data.code
    };
};

// Retorna funcao asincrona para setar dados do perfil na api
export const postProfile = (username, profileData) => {
    return dispatch => {
        dispatch(postProfileStart());
        return axios.post('/user/' + username + '/profile' , profileData, { withCredentials: true })
        .then(response => {
            dispatch(postProfileSuccess(response.data.data));
            return response;
        })
        .catch(error => {
            if (error.response) {
                // Request enviado e resposta do servidor com status erro
                dispatch(postProfileError(error.response.data.error));
              } else if (error.request && !error.status) {
                // Request enviado sem resposta do servidor
                dispatch(postProfileError({ code: null, message: error.message }));
              } else {
                // Algo aconteceu na criacao do request e gerou um erro
                dispatch(postProfileError({ code: null, message: error.message }));
              }
            throw error.response.data.error;
        });  
    };
};