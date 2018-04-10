import React from 'react';

import { logoutUser } from '../actions/LoginProcessAction';
import { connect } from 'react-redux';
import LoginPage from './login/LoginPage';
import PropTypes from 'prop-types';
class Logout extends React.Component {

    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return (

      <LoginPage />

    );
    }
}

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

Logout.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(null, { logoutUser })(Logout);

