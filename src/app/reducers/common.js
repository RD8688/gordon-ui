/* eslint-disable */
import {
    SET_PROPERTIES, SET_GENERAL_MESSAGE,
    REMOVE_GENERAL_MESSAGE, SET_CORPORATES, DELETE_CORPORATE,
    SET_USERS, SET_STATES
} from '../actions/types';

import isEmpty from 'lodash/isEmpty';
const initialState = {
    generalMessage: {}
};
function clone(state) {
    return {...state};
}


function getSalesUsersMap(users) {
    let usersMap = [];
    for (let i in users) {
        let user = users[i];
        usersMap[user.userId] = user;
    }

    return usersMap;
}

function getCorporateUsersMap(users) {
    let usersMap = [];
    for (let i in users) {
        let user = users[i];
        usersMap[user.userId] = user;
    }

    return usersMap;
}

function getStatesMap(states) {
    let statesMap = {};
    for (let i in states) {
        let state = states[i];
        statesMap[state.id] = state;
    }

    return statesMap;
}

export default (state = initialState, action = {}) => {
    let newState = clone(state);;
    switch (action.type) {
        case SET_GENERAL_MESSAGE:
            newState.generalMessage = {};
            newState.generalMessage.success = action.generalMessage.success;
            newState.generalMessage.msg = action.generalMessage.msg;
            return newState;
        case REMOVE_GENERAL_MESSAGE:
            newState.generalMessage = {};
            return newState;
        case SET_STATES:
            newState.statesMap = getStatesMap(action.states);
            return newState;
        default:
            return state;
    }
};
