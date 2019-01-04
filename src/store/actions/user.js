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