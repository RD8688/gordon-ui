/* eslint-disable react/prop-types,no-unused-vars,eqeqeq,no-eq-null */
import React from 'react';
import PropTypes from 'prop-types';
import Routes from '../routes';
import NavigationBar from './NavigationBar';
import {connect} from 'react-redux';
import SuccessOrErrorMessage from './common/SuccessOrErrorMessage';
import style from '../../../dist/app/css/style.css';
import boot from '../../../dist/app/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }


    render() {
        const { dispatch, generalMessage } = this.props;

        return (
            <div >
                <NavigationBar/>
                {Routes}
                {generalMessage.success != null ? <SuccessOrErrorMessage dispatch={dispatch} generalMessage={generalMessage} /> : ''}
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    generalMessage: PropTypes.object.isRequired
};
App.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { generalMessage } = state.common;

    return {
        generalMessage
    };
};
export default connect(mapStateToProps)(App);
