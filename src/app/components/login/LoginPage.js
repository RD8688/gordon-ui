import React from 'react';

import { connect } from 'react-redux';

import { loginRequest, loginOtpValidationRequest, loginOtpResendRequest, loginResetStore } from '../../actions/LoginProcessAction';

import LoginRoot from './LoginRoot';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onLoginOtpSubmit = this.onLoginOtpSubmit.bind(this);
        this.onLoginOtpResend = this.onLoginOtpResend.bind(this);
        this.onLoginOtpCancel = this.onLoginOtpCancel.bind(this);
        this.onOtpLimitExceeded = this.onOtpLimitExceeded.bind(this);
    // this.props.loginResetStore();
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.context.router.history.push('/about');
        }
    }


    componentWillReceiveProps(nextProps) {
    // if isAuthenticated is true, then token must be present
    // console.log('nextProps.isAuthenticated: ', nextProps.isAuthenticated);
        if (nextProps.isAuthenticated) {
      /*
      * RESET STORE PARAMS ON SUCCESSFUL 1 or 2 FACTOR LOGIN
      * like isLoggingIn, isOtpValidating, isOtpValidated etc
      * except isAuthenticated and user profile
      */
            this.props.loginResetStore();
            this.context.router.push('/property/contracts/view');
        }
    }

    onLoginSubmit(data) {
        const params = {
            username: data.username,
            password: data.password,
            userType: 'EXECUTIVE',
        };

        this.props.loginRequest(params);
    }

    onLoginOtpSubmit(data) {
        const params = {
            username: this.props.userData.username,
            otp: data.otp,
            userType: 'EXECUTIVE',
        };
        this.props.loginOtpValidationRequest(params);
    }

    onLoginOtpCancel() {
        this.props.loginResetStore();
    }

    onOtpLimitExceeded() {
        this.props.loginResetStore();
    }

    onLoginOtpResend() {
        const params = {
            username: this.props.userData.username,
            userType: 'EXECUTIVE',
        };
        this.props.loginOtpResendRequest(params);
    }

    shouldShowOTPForm() {
        return (this.props.isLoggedIn && !this.props.isOtpValidated);
    }

    render() {
        return (
      <div className="login-wrapper">
        <LoginRoot
          showOtpForm={this.shouldShowOTPForm()}
          invalidOtpCount={this.props.invalidOtpCount}
          isLoginFormSubmitting={this.props.isLoginFormSubmitting}
          isOTPFormSubmitting={this.props.isOTPFormSubmitting}
          onLoginSubmit={this.onLoginSubmit}
          onLoginOtpSubmit={this.onLoginOtpSubmit}
          onLoginOtpResend={this.onLoginOtpResend}
          onLoginOtpCancel={this.onLoginOtpCancel}
          onOtpLimitExceeded={this.onOtpLimitExceeded}
        />
      </div>
    );
    }
}

// LoginPage.defaultProps = {
//   isLoginFormSubmitting: false,
//   isOTPFormSubmitting: false,
//   isLoggedIn: false,
//   isOtpValidated: false,
//   invalidOtpCount: 0,
//   isAuthenticated: false,
//   userData: {},
//   loginRequest() {},
//   loginOtpValidationRequest() {},
//   loginOtpResendRequest() {},
//   loginResetStore() {},
// };

LoginPage.propTypes = {
    isLoginFormSubmitting: PropTypes.bool,
    isOTPFormSubmitting: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isOtpValidated: PropTypes.bool,
    invalidOtpCount: PropTypes.number,
    isAuthenticated: PropTypes.bool,
    userData: PropTypes.object,
    loginRequest: PropTypes.func,
    loginOtpValidationRequest: PropTypes.func,
    loginOtpResendRequest: PropTypes.func,
    loginResetStore: PropTypes.func,
};

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { loginUser } = state;
    return {
        isLoginFormSubmitting: loginUser.isLoggingIn,
        isOTPFormSubmitting: loginUser.isOtpValidating,
        isLoggedIn: loginUser.isLoggedIn,
        isOtpValidated: loginUser.isOtpValidated,
        invalidOtpCount: loginUser.invalidOtpCount,
        isAuthenticated: loginUser.isAuthenticated,
        userData: loginUser.userData,
    };
}

export default connect(mapStateToProps, {
    loginRequest,
    loginOtpValidationRequest,
    loginOtpResendRequest,
    loginResetStore,
})(LoginPage);
