import React from 'react';
import {isEmpty} from '../../utils/common.js';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {
                username: null,
                password: null,
            },
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.removeErrorMsg = this.removeErrorMsg.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const formData = {
            username: this.username.value,
            password: this.password.value,
        };

        if (this.validateInput(formData)) {
            this.props.onLoginSubmit(formData);
        }
    }

    validateInput(data) {
        if (isEmpty(data.username)) {
            this.setState({ errors: { username: 'Username is required!' } });
            return false;
        }
        if (isEmpty(data.password)) {
            this.setState({ errors: { password: 'Password is required!' } });
            return false;
        }

        return true;
    }

    removeErrorMsg() {
        this.setState({ errors: { username: null, password: null } });
    }

    render() {
        let submitButton = (
      <button
        type="submit"
        className="login-link"
      >LOG IN</button>
    );

        if (this.props.isFormSubmitting) {
            submitButton = (<button className="login-link" >LOG IN</button>);
        }

        return (

      <div className="login-form slideInRight">
      <div>
      <style dangerouslySetInnerHTML={{__html: `.modal-backdrop{
        display:none !important;
      }`}}>

      </style>
      </div>
        <form onSubmit={this.onFormSubmit}>
        <div className="form-wrap">
          <label htmlFor="username"> Username / Mobile No.</label>
          <input
          autoFocus="autofocus"
            type="text"
            ref={(input) => { this.username = input; }}
            autoComplete="off"
            placeholder="Enter Username or Mobile No"
            onFocus={this.removeErrorMsg}
          />
          <p className="field-error">{this.state.errors.username}</p>
        </div>
        <div className="form-wrap">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            ref={(input) => { this.password = input; }}
            placeholder="Enter Password"
            onFocus={this.removeErrorMsg}
          />
          <p className="field-error">{this.state.errors.password}</p>
        </div>
        {submitButton}
        </form>
      </div>
    );
    }
}

// LoginForm.defaultProps = {
//   onLoginSubmit() {},
//   isFormSubmitting: false,
// };

LoginForm.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired,
    isFormSubmitting: PropTypes.bool,
};

export default LoginForm;
