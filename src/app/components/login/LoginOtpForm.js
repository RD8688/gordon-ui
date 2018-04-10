import React from 'react';


import {isEmpty, isNumber} from '../../utils/common.js';
import PropTypes from 'prop-types';
class LoginOtpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {
                otp: null,
            },
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.removeErrorMsg = this.removeErrorMsg.bind(this);
        this.onResendOtp = this.onResendOtp.bind(this);
        this.onCancelOtp = this.onCancelOtp.bind(this);
        this.onOtpLimitExceeded = this.onOtpLimitExceeded.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFormSubmitting && nextProps.invalidOtpCount > 0) {
            if (nextProps.invalidOtpCount === nextProps.maxOtpAttempts) {
                this.onOtpLimitExceeded();
                return;
            }

            this.setState({ errors: { otp: `${'Entered OTP is incorrect! Attempts left: '}${nextProps.maxOtpAttempts - nextProps.invalidOtpCount}` } });
        }
    }

    onResendOtp() {
        this.props.onLoginOtpResend();
    }

    onCancelOtp() {
        this.props.onLoginOtpCancel();
    }

    onOtpLimitExceeded() {
        this.props.onOtpLimitExceeded();
    }

    onFormSubmit(e) {
        e.preventDefault();
        const formData = {
            otp: this.otp.value,
        };

        if (this.validateInput(formData)) {
            this.props.onLoginOtpSubmit(formData);
        }
    }

    validateInput(data) {
        if (isEmpty(data.otp)) {
            this.setState({ errors: { otp: 'OTP is required!' } });
            return false;
        }

        if (!isNumber(data.otp)) {
            this.setState({ errors: { otp: 'OTP must be a number!' },
      });
            return false;
        }

        return true;
    }

    removeErrorMsg() {
        this.setState({ errors: { otp: null } });
    }

    render() {
        let submitButton = (
      <button
        className="login-link"
      >SUBMIT</button>
    );

        if (this.props.isFormSubmitting) {
            submitButton = (<button className="login-link" >SUBMIT</button>);
        }

        return (
      <div className="login-otp-form slideInRight">
        <form onSubmit={this.onFormSubmit}>
        <div className="form-wrap">
          <label htmlFor="username">One-time Password</label>
          <input
          autoFocus="autofocus"
            type="text"
            ref={(input) => { this.otp = input; }}
            autoComplete="off"
            placeholder="Enter OTP"
            onFocus={this.removeErrorMsg}
          />
          <p className="field-error">{this.state.errors.otp}</p>
          <a role="link" className="resend-otp resend-otp-link cursor_pointer" onClick={this.onResendOtp}>Resend Otp</a>
        </div>
       <div className="btn-wrapper">
         <div className="btn-right">
         <a role="link" className="abort-otp-link cursor_pointer" onClick={this.onCancelOtp}>Cancel</a>
         {submitButton}
         </div>
       </div>
        </form>

      </div>
    );
    }
}

LoginOtpForm.defaultProps = {
    onLoginOtpSubmit() {},
    onLoginOtpCancel() {},
    onLoginOtpResend() {},
    onOtpLimitExceeded() {},
    isFormSubmitting: false,
    invalidOtpCount: 0,
    maxOtpAttempts: 5,
};

LoginOtpForm.propTypes = {
    onLoginOtpSubmit: PropTypes.func.isRequired,
    onLoginOtpCancel: PropTypes.func.isRequired,
    onLoginOtpResend: PropTypes.func.isRequired,
    onOtpLimitExceeded: PropTypes.func.isRequired,
    isFormSubmitting: PropTypes.bool,
    invalidOtpCount: PropTypes.number,
    maxOtpAttempts: PropTypes.number,
};

export default LoginOtpForm;
