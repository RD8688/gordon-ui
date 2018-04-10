export default {
    login: {
        BASE_URL: '/fabuser',
        LOGIN_REQUEST: '/agent/login',
        OTP_VALIDATION: '/agent/otp/validation',
        LOGIN_OTP_RESEND: '/agent/otp/resend',
        FETCH_USER_PROFILE: '/user/getUserProfile'
    },

    corporateAggregation: {
        BASE_URL: '/fabcorporateaggregation/api/admin/',

        CORPORATE_DETAILS: {
            BASE: 'corporatedetails/',
            GET_ALL: 'all',
            CREATE_CORPORATE: 'create',
            CREATE_UNAPPROVED_CORPORATE: 'create/unapproved',
            UPDATE_CORPORATE: 'update',
            DELETE_CORPORATE: 'delete/',
            UPDATE_BTC: 'updatebtc/',
            UPDATE_VIP: 'vip/',
            UPDATE_SEZ: 'updatesez/',
            FIND_BY_ID: 'find/',
            GSTIN: 'gstin/update',
            GSTIN_ALL: 'gstin/all'
        },
        STATES: {
            BASE: 'states/',
            GET_ALL: 'all'
        },


        USERS: {
            BASE: 'users/',
            GET_CORPORATE_MAPPINGS: 'user/corporate/mapping',
            UPDATE_CORPORATE_MAPPINGS: 'user/corporate/mapping/update',
            DELETE_CORPORATE_MAPPINGS: 'user/corporate/mapping/delete',
            FETCH_USERS: 'search',
            CREATE_CORPORATE_USER_MAPPING: 'user/corporate/mapping/create',
        },

        CORPORATE_CONTRACTS: {
            BASE: 'corporatecontracts/',
            TOGGLE_STATUS: 'togglestatus',
            GET_CONTRACTS: 'get/contracts/',
            UPLOAD: 'bulkupload/',
            DEFAULT_ALL: 'get/contracts/default/all'
        },

        PROPERTY: {
            BASE: 'property/',
            GET_ALL: 'all'
        }
        // DELETE_CORPORATE_MAPPINGS: 'corporate/mapping/delete?'

    }


};
