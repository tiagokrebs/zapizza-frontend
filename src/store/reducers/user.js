import { USER } from '../actions/actionsTypes';
import updateObject from '../../shared/updateObject';

const initialState = {
    userId: null,
    emailConfirmed: null,
    firstName: null,
    lastName: null
}

export const setUserData = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        emailConfirmed: action.emailConfirmed,
        firstName: action.firstName,
        lastName: action.lastName
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER.SET_DATA: return setUserData(state, action);
        default: return state;
    }
};

export default reducer;