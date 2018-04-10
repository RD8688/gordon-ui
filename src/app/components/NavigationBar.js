/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/LoginProcessAction';


class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <div className="right_menu">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">CORPORATE CONTRACT
                    <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a className="cursor_pointer">Manage Contracts</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">MANAGE CORPORATES
                    <span className="caret"></span></a>
                  <ul className="dropdown-menu">

                  </ul>
                </li>


                  <li className="dropdown">
                      <Link to="/logout">LOGOUT</Link>
                  </li>

              </ul>
            </div>

        );

        const guestLinks = (
            <div className="logout">
            </div>
        );

        return (
            <div className="row mrg_z">
              <header>
                <div className="logo">
                  <Link to="/property/contracts/view">
                    <span className="logo-icon"></span>
                    <span className="text">Gordon Admin</span>
                  </Link></div>
                  {isAuthenticated ? userLinks : guestLinks}
              </header>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.loginUser
    };
}

export default connect(mapStateToProps, { logoutUser })(NavigationBar);
