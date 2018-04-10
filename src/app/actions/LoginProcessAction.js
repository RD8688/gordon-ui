/* eslint-disable*/
import {LOGIN_RESET_STORE, LOGIN_REQUEST_INIT, LOGIN_REQUEST_SUCCESS,
LOGIN_REQUEST_FAILED, LOGIN_OTP_VALIDATION_FAILED,
USER_PROFILE_FETCH_REQUEST_SUCCESS,
USER_PROFILE_FETCH_REQUEST_FAILED,
LOGOUT_REQUEST,
LOGIN_OTP_RESEND_FAILED,
LOGIN_OTP_VALIDATION_INIT, LOGIN_OTP_VALIDATION_SUCCESS,
LOGIN_OTP_RESEND_INIT, LOGIN_OTP_RESEND_SUCCESS, USER_PROFILE_FETCH_REQUEST_INIT} from './types.js';
import {isEmpty} from '../utils/common.js';
import Request from '../utils/Request.js';
import urls from '../utils/urls';
import {handleGeneralMessage, removeGeneralMessage} from './common';
/**
 * Login Actions
 */

export function loginResetStore() {
    return {
        type: LOGIN_RESET_STORE,
    };
}

export function loginInit() {
    return {
        type: LOGIN_REQUEST_INIT,
    };
}

export function loginSuccessful(data, headers) {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        payload: {
            receivedAt: Date.now(),
            data,
            headers,
        },
    };
}

export function loginFailed(error) {
    return {
        type: LOGIN_REQUEST_FAILED,
    };
}

export function loginRequest(params) {
    return (dispatch) => {
        const successFn = (data, headers) => {
            console.log('logged in successfully: '+ JSON.stringify(data));
            dispatch(removeGeneralMessage());
            dispatch(loginSuccessful(data, headers));
            if (!data.success) {
                console.log("showing error message...");
                dispatch(handleGeneralMessage(false, data.messages));
                setTimeout(function() {
                    console.log("removing error message...");
                    dispatch(removeGeneralMessage());
                }.bind(this), 3000);
            }
        };

        const errorFn = (error) => {
            dispatch(removeGeneralMessage());
            dispatch(loginFailed(error));
        };

        dispatch(loginInit());

        const api = new Request(dispatch, successFn, errorFn, false);
        dispatch(handleGeneralMessage(true, 'Validating User...'));
        console.log('loggin in.. ' + JSON.stringify(params));
        return api.post(urls.login.BASE_URL + urls.login.LOGIN_REQUEST, params);
    };
}


/**
 * Validate Otp Actions
 */
export function loginOtpValidationInit() {
    return {
        type: LOGIN_OTP_VALIDATION_INIT,
    };
}

export function loginOtpValidationSuccessful(data, headers) {
    return {
        type: LOGIN_OTP_VALIDATION_SUCCESS,
        payload: {
            receivedAt: Date.now(),
            data,
            headers,
        },
    };
}

export function loginOtpValidationFailed(error) {
    return {
        type: LOGIN_OTP_VALIDATION_FAILED,
    };
}

export function loginOtpValidationRequest(params) {
    return (dispatch) => {
        const successFn = (data, headers) => {
            dispatch(removeGeneralMessage());
            dispatch(loginOtpValidationSuccessful(data, headers));
        };

        const errorFn = (error) => {
            dispatch(removeGeneralMessage());
            dispatch(loginOtpValidationFailed(error));
        };

        dispatch(loginOtpValidationInit());

        const api = new Request(dispatch, successFn, errorFn, false);
        dispatch(handleGeneralMessage(true, 'Validating OTP...'));
        return api.post(urls.login.BASE_URL + urls.login.OTP_VALIDATION, params);
    };
}


/**
 * Resend Otp Actions
 */
export function loginOtpResendInit() {
    return {
        type: LOGIN_OTP_RESEND_INIT,
    };
}

export function loginOtpResendSuccessful(data) {
    return {
        type: LOGIN_OTP_RESEND_SUCCESS,
        payload: {
            receivedAt: Date.now(),
            data,
        },
    };
}

export function loginOtpResendFailed(error) {
    return {
        type: LOGIN_OTP_RESEND_FAILED,
    };
}

export function loginOtpResendRequest(params) {
    return (dispatch) => {
        const successFn = (data, headers) => {
            dispatch(loginOtpResendSuccessful(data));
        };

        const errorFn = (error) => {
            dispatch(loginOtpResendFailed(error));
        };

        dispatch(loginOtpResendInit());

        const api = new Request(dispatch, successFn, errorFn, false);
        return api.post(urls.login.BASE_URL + urls.login.LOGIN_OTP_RESEND, params);
    };
}


/**
 * Get User Profile Actions
 */
export function fetchUserProfileInit() {
    return {
        type: USER_PROFILE_FETCH_REQUEST_INIT,
    };
}

export function fetchUserProfileSuccessful(data) {
    return {
        type: USER_PROFILE_FETCH_REQUEST_SUCCESS,
        payload: {
            receivedAt: Date.now(),
            data,
        },
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function fetchUserProfileFailed() {
    return {
        type: SER_PROFILE_FETCH_REQUEST_FAILED,
    };
}

export function fetchUserProfileRequest(params) {
    return (dispatch) => {
        const successFn = (data, headers) => {
            dispatch(fetchUserProfileSuccessful(data));
        };

        const errorFn = (data, headers, status) => {
            dispatch(fetchUserProfileFailed());
        };

        dispatch(fetchUserProfileInit());

        const api = new Request(dispatch, successFn, errorFn);
        return api.get(urls.login.BASE_URL + urls.login.FETCH_USER_PROFILE, params);
    };
}

export function shouldFetchUserProfile(state) {
    return (isEmpty(state.loginUser.userData));
}

export function fetchUserProfileIfNeeded(params) {
    return (dispatch, getState) => {
        if (shouldFetchUserProfile(getState())) {
            return dispatch(fetchUserProfileRequest(params));
        }
      // Let the calling code know there's nothing to wait for.
        return Promise.resolve();
    };
}
