import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
// import {ConnectedRouter} from 'react-router-redux';
import { Router } from 'react-router';


import App from '../components/App';
// import DevTools from './DevTools';
// import NavigationBar from '../components/NavigationBar';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div>
                <Router history={history}>
                    <Route path="/" component={App}/>
                </Router>
                {/* <DevTools />*/}
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
