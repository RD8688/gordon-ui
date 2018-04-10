/* eslint-disable */
import axios from 'axios';
import {
    SET_PROPERTIES, SET_GENERAL_MESSAGE,
    REMOVE_GENERAL_MESSAGE, SET_CORPORATES, DELETE_CORPORATE,
    SET_USERS,
    SET_STATES
} from './types';
import { timeout } from '../utils/common';
import {
    logoutUser
} from './LoginProcessAction';
import { get, post, put, isEmpty, getHeader } from '../utils/common';

import urls from '../utils/urls';


// import {
//     setDefaultPropertyIdForNewProperty
// } from './createCorporateContractActions';

export function setProperties(propertiesList) {
    return {
        type: SET_PROPERTIES,
        propertiesList: propertiesList
    };
}

export function removeGeneralMessage() {
    return {
        type: REMOVE_GENERAL_MESSAGE
    };
}

export function setGeneralMessage(generalMessage) {
    return {
        type: SET_GENERAL_MESSAGE,
        generalMessage: generalMessage
    };
}

export function setError(error, dispatch, showGeneral) {
    if (showGeneral || (error.errors == null || error.errors.length == 0)) {
        dispatch(handleGeneralMessage(false, error.message));
        timeout(removeGeneralMessage, 3000, dispatch);
        return null;
    } else {
        return error.errors;
    }
}

export function hideSuccessOrErrorMsg() {
    return dispatch => {
        dispatch(removeGeneralMessage());
    };
}

export function handleGeneralMessage(isSuccess, msgData) {
    var msg = {};
    msg.success = isSuccess;
    msg.msg = msgData;
    return setGeneralMessage(msg);
}


export function handleAuthenticationAndAuthorization(status) {
    switch (status) {
        case 401:
            return logoutUser();
        case 403:
            return handleGeneralMessage(false, 'Oops! You are not authorized for this actions. ');

    }
}
export function fetchProperties(selectedPropertyId) {
    return dispatch => {
        var url = urls.corporateAggregation.BASE_URL + urls.corporateAggregation.PROPERTY.BASE + urls.corporateAggregation.PROPERTY.GET_ALL;

        return get(url, getHeader(url)).then(response => {
            if (!isEmpty(response.data)) {
                var data = response.data;
                if (!isEmpty(data.data)) {
                    dispatch(setProperties(data.data));
                }
            }
        }).catch(error => {
            if (error.response != null && error.response.status != null) {
                dispatch(handleAuthenticationAndAuthorization(error.response.status));
                timeout(removeGeneralMessage, 3000, dispatch);
            }
        });
    };
}

export function fetchCorporates() {
    var url = urls.corporateAggregation.BASE_URL + urls.corporateAggregation.CORPORATE_DETAILS.BASE + urls.corporateAggregation.CORPORATE_DETAILS.GET_ALL;

    return dispatch => {
        return get(url, getHeader(url)).then(response => {
            var array = [];

            if (!isEmpty(response.data)) {
                var data = response.data;
                if (!isEmpty(data.data)) {
                    dispatch(setCorporates(data.data));
                }
            }
        }).catch(error => {
            if (error.response != null && error.response.status != null) {
                dispatch(handleAuthenticationAndAuthorization( error.response.status));
                timeout(removeGeneralMessage, 3000, dispatch);
            }
        });
    };
}

export function fetchUsers(userType) {
    var start = urls.corporateAggregation.BASE_URL + urls.corporateAggregation.USERS.BASE +
        urls.corporateAggregation.USERS.FETCH_USERS;
    var url = start + '?userType=' + userType;
    return dispatch => {
        return get(url, getHeader(start)).then(response => {
            var array = [];
            if (!isEmpty(response.data)) {
                var data = response.data;
                if (!isEmpty(data.data)) {
                    dispatch(setUsers(data.data, userType));
                }
            }
        }).catch(error => {
            if (error.response != null && error.response.status != null) {
                dispatch(handleAuthenticationAndAuthorization(error.response.status));
                timeout(removeGeneralMessage, 3000, dispatch);
            }
        });
    };
}

export function setCorporates(corporates) {
    return {
        type: SET_CORPORATES,
        corporates: corporates
    };
}

export function setStates(states) {
    return {
        type: SET_STATES,
        states
    };
}
export function setUsers(users, userType) {
    return {
        type: SET_USERS,
        users,
        userType
    };
}


export function handleError(error, dispatch) {
    dispatch(removeGeneralMessage());
    var msg = {};
    msg.success = false;
    if (error.response != null && error.response.status != null) {
        var errorObject = error.response.data;
        console.log(errorObject);
        switch (error.response.status) {
            case 401:
            case 403:
                dispatch(handleAuthenticationAndAuthorization(error.response.status));
                timeout(removeGeneralMessage, 3000, dispatch);
                break;
            case 400:
            case 503:
            case 500:
            default:
                return setError(errorObject, dispatch, false);


        }
    }
}

export function deleteCorporate(corporateId) {
    return {
        type: DELETE_CORPORATE,
        corporateId
    };
}

export function fetchStates() {
    var url = urls.corporateAggregation.BASE_URL + urls.corporateAggregation.STATES.BASE + urls.corporateAggregation.STATES.GET_ALL;

    return dispatch => {
        return get(url, getHeader(url)).then(response => {
            var array = [];

            if (!isEmpty(response.data)) {
                var data = response.data;
                if (!isEmpty(data.data)) {
                    dispatch(setStates(data.data));
                }
            }
        }).catch(error => {
            if (error.response != null && error.response.status != null) {
                dispatch(handleAuthenticationAndAuthorization( error.response.status));
                timeout(removeGeneralMessage, 3000, dispatch);
            }
        });
    };
}
