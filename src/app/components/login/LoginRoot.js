/* eslint-disable */
import React from 'react';

import styleLess from '../../../../dist/app/css/less/style.less';
import LoginForm from './LoginForm';
import LoginOtpForm from './LoginOtpForm';
import PropTypes from 'prop-types';

class LoginRoot extends React.Component {

    render() {
        let loginComponent = (
      <LoginForm
        isFormSubmitting={this.props.isLoginFormSubmitting}
        onLoginSubmit={this.props.onLoginSubmit}
      />
    );

    // show the otp form (one of Login or OTP form will be shown at a time)
        if (this.props.showOtpForm) {
            loginComponent = (
        <LoginOtpForm
          invalidOtpCount={this.props.invalidOtpCount}
          isFormSubmitting={this.props.isOTPFormSubmitting}
          onLoginOtpSubmit={this.props.onLoginOtpSubmit}
          onLoginOtpResend={this.props.onLoginOtpResend}
          onLoginOtpCancel={this.props.onLoginOtpCancel}
          onOtpLimitExceeded={this.props.onOtpLimitExceeded}
        />
      );
        }

        return (
      this.props.showOtpForm == true ? <LoginOtpForm
          invalidOtpCount={this.props.invalidOtpCount}
          isFormSubmitting={this.props.isOTPFormSubmitting}
          onLoginOtpSubmit={this.props.onLoginOtpSubmit}
          onLoginOtpResend={this.props.onLoginOtpResend}
          onLoginOtpCancel={this.props.onLoginOtpCancel}
          onOtpLimitExceeded={this.props.onOtpLimitExceeded}
        /> : <LoginForm
        isFormSubmitting={this.props.isLoginFormSubmitting}
        onLoginSubmit={this.props.onLoginSubmit}
      />


    );
    }
}

// LoginRoot.defaultProps = {
//   showOtpForm: false,
//   invalidOtpCount: 0,
//   isLoginFormSubmitting: false,
//   isOTPFormSubmitting: false,
//   isResendingOTP: false,
//   onLoginSubmit() {},
//   onLoginOtpSubmit() {},
//   onLoginOtpCancel() {},
//   onLoginOtpResend() {},
//   onOtpLimitExceeded() {},
// };

LoginRoot.propTypes = {
    showOtpForm: PropTypes.bool,
    invalidOtpCount: PropTypes.number,
    isLoginFormSubmitting: PropTypes.bool,
    isOTPFormSubmitting: PropTypes.bool,
    isResendingOTP: PropTypes.bool,
    onLoginSubmit: PropTypes.func.isRequired,
    onLoginOtpSubmit: PropTypes.func.isRequired,
    onLoginOtpCancel: PropTypes.func.isRequired,
    onLoginOtpResend: PropTypes.func.isRequired,
    onOtpLimitExceeded: PropTypes.func.isRequired,
};

export default LoginRoot;
