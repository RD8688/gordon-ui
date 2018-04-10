import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginAuthorization extends React.Component {

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.context.router.push('/login');
        }
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
            this.context.router.push('/login');
        }
    }

    render() {
        return  (

     React.cloneElement(this.props.children, { dispatch: this.props.dispatch })
   );
    }
}

// LoginAuthorization.defaultProps = {
//   isAuthenticated: true
// };

LoginAuthorization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
};

LoginAuthorization.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { isAuthenticated } = state.loginUser;

    return {
        isAuthenticated: isAuthenticated,
    };
}

export default connect(mapStateToProps)(LoginAuthorization);
