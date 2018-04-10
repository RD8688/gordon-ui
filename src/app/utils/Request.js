/* eslint-disable no-undef */
import axios from 'axios';

import {getObjectValue, httpStatusCodes} from '../utils/common';
import {getAuthToken, isAuthenticated} from './common.js';
import { logoutUser } from './../actions/LoginProcessAction';

class Request {

    constructor(dispatch, successFn, errorFn, authorize = true) {
        this.authorize = authorize;
        this.successFn = typeof successFn === 'function' ? successFn : () => {};
        this.errorFn = typeof errorFn === 'function' ? errorFn : () => {};
        this.dispatch = typeof dispatch === 'function' ? dispatch : () => {};
    }

    static get baseUrl() {
        return '';
    }

/**
 * GET axios instance and do things that are common for every request
 */
    instance() {
        const headers = {};

        if (this.authorize) headers.token = getAuthToken();

        const instance = axios.create({
            baseURL: Request.baseUrl,
    //   timeout: 1000,
            headers,
        });

    // Response Interceptor
        instance.interceptors.response.use(undefined, (error) => {
            const status = getObjectValue(error, 'response.status', null);
            if (status === httpStatusCodes.UNAUTHORIZED) {
        // Unauthorized User
                this.dispatch(logoutUser());
            }

            return Promise.reject(error);
        });

        return instance;
    }

/**
 * Make GET Requests
 * @param {string} url
 * @param {object} params
 */
    get(url, params = {}) {
        if (this.authorize && !isAuthenticated()) { return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST); }

        return this.instance()
    .get(url, { params })
    .then((response) => {
        const data = getObjectValue(response, 'data', null);
        const headers = getObjectValue(response, 'headers', null);
        const isSuccess = true;
        this.successFn(data, headers, isSuccess);
    })
    .catch((error) => {
        const data = getObjectValue(error, 'response.data', null);
        const headers = getObjectValue(error, 'response.headers', null);
        const status = getObjectValue(error, 'response.status', null);
        this.errorFn(data, headers, status);
    });
    }

/**
 * Make POST Requests
 * @param {string} url
 * @param {object} params
 */
    post(url, params) {
        if (this.authorize && !isAuthenticated()) { return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST); }

        return this.instance()
    .post(url, params)
    .then((response) => {
        const data = getObjectValue(response, 'data', null);
        const headers = getObjectValue(response, 'headers', null);
        const isSuccess = true;
        this.successFn(data, headers, isSuccess);
    })
    .catch((error) => {
        const data = getObjectValue(error, 'response.data', null);
        const headers = getObjectValue(error, 'response.headers', null);
        const status = getObjectValue(error, 'response.status', null);
        this.errorFn(data, headers, status);
    });
    }
}

export default Request;
