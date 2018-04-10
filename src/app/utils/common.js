/* eslint-disable*/

import axios from 'axios';
import { logoutUser } from '../actions/LoginProcessAction';
import moment from 'moment';
export function timeout(func, time, dispatch) {
    setTimeout(function() {
        if (dispatch === null) {
            func();
        }
        else
        {
            dispatch(func());
        }
    }.bind(this), time);
}

export function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }


    return year + '-' + month + '-' + day;
}

export function getDateInFormat(dateInString, dateFormat) {
    if (isEmpty(dateInString)) {
        return null;
    }
    var temp = moment(dateInString).format(dateFormat);
    return temp;
}

export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    var day = result.getDate();
    var month = result.getMonth() + 1;
    var year = result.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }


    return year + '-' + month + '-' + day;
}


export function saveAuthToken(token) {
    localStorage.setItem('pricingToken', token);
    setAuthorizationToken(token);
}

export function getAuthToken() {
    return localStorage.getItem('pricingToken');
}

export function clearAuthToken() {
    localStorage.removeItem('pricingToken');
    setAuthorizationToken(false);
}

export function isAuthenticated() {
    const isAuthenticated = !isEmpty(getAuthToken());
    return isAuthenticated;
}


export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['token'] = token;
    } else {
        delete axios.defaults.headers.common['token'];
    }
}
export function getHeader(uri) {
    const config = {
        headers: {
            'uri': uri
        }
    };
    return config;
}

export function get(url, cofig) {
    if (!isAuthenticated()) {
        setAuthorizationToken(false);
    }
    return axios.get(url, cofig);
}

export function deleteMethod(url, cofig) {
    if (!isAuthenticated()) {
        setAuthorizationToken(false);
    }
    return axios.delete(url, cofig);
}

export function post(url, data, cofig) {
    if (!isAuthenticated()) {
        setAuthorizationToken(false);
    }
    return axios.post(url, data, cofig);
}
export function put(url, data) {
    if (!isAuthenticated()) {
        setAuthorizationToken(false);
    }
    return axios.put(url, data);
}


// import logger from 'logger';
// const log = logger.createLogger(config.LOG_FILE_PATH);

export function getIP(req) {
    if (req == null) {
        return null;
    }
    return req.headers['x-real-ip'] || req.connection.remoteAddress;
}

export function isEmpty(obj) {
    let isEmpty = false;
    const type = typeof obj;

    isEmpty = isEmpty || !obj;
    isEmpty = isEmpty || (type === 'undefined'); // if it is undefined
    isEmpty = isEmpty || (obj === null); // if it is null
    isEmpty = isEmpty || (type === 'string' && (obj === '')); // if the string is empty
    isEmpty = isEmpty || (obj === false || obj === 0); // if boolean value returns false
    isEmpty = isEmpty || (Array.isArray(obj) && obj.length === 0); // if array is empty
    isEmpty = isEmpty || (type === 'object' && Object.keys(obj).length === 0); // if object is empty

    return isEmpty;
}

export function isEmail(value) {
    return value.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/);
}

// check if the value is integer or float
export function isNumber(value, integerOnly = true) {
    if (integerOnly) {
        return value.match(/^\s*[+-]?\d+\s*$/);
    }

    return value.match(/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/);
}

// check if the strinc contains alphabets (spaces) only
export function isAlphabet(value, allowSpaces = true) {
    if (allowSpaces) {
        return value.match(/^[a-zA-Z\s]+$/);
    }

    return value.match(/^[a-zA-Z]+$/);
}


export function getObjectValue(obj, key, defaultValue = null) {
    let enumerator = obj;
    let property = key;

    if (isEnumerable(enumerator) && keyExists(property, enumerator)) {
        return enumerator[property];
    }

    const dotLastIndex = property.lastIndexOf('.');

    if (dotLastIndex >= 0) {
        const withoutLastKey = property.substr(0, dotLastIndex);
        enumerator = getObjectValue(enumerator, withoutLastKey, defaultValue);
        property = property.substr(dotLastIndex + 1);
    }

    if (isEnumerable(enumerator)) {
        return (keyExists(property, enumerator) ? enumerator[property] : defaultValue);
    }
    return defaultValue;
}

export function isEnumerable(obj) {
    let isEnumerable = false;

    if (Array.isArray(obj) || (obj instanceof Object)) {
        isEnumerable = true;
    }

    return isEnumerable;
}

export const httpStatusCodes = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
};

export function getObjectValueIfEmpty(obj, key, defaultValue = null) {
    const value = getObjectValue(obj, key);

    if (isEmpty(value)) { return defaultValue; }
    return value;
}

export function clone(oldObject, newObject) {
    return { ...oldObject, ...newObject };
}

export function keyExists(key, obj) {
    if ((Array.isArray(obj) && key in obj) ||
            (obj instanceof Object && Object.prototype.hasOwnProperty.call(obj, key))) {
        return true;
    }

    return false;
}

export function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}


export function isValidCorporate(corporate) {
    let errors = {};


    if (corporate.corporateName == null || corporate.corporateName.toString().trim() == '') {
        errors.corporateName = 'Is Required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


