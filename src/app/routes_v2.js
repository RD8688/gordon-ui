/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/App';

import LoginPage from './components/login/LoginPage';
import Logout from './components/Logout';
import { isAuthenticated } from './utils/common.js';
import LoginAuthorization from './utils/LoginAuthorization';
import FilterableTable from './containers/FilterableTable';
import About from './components/About';

function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({ pathname: '/login' });
    }
}

export default (store) => (

  <Route path="/" component={App}>
    <IndexRedirect to="view" />

    <Route path="login" component={LoginPage} />
    <Route path="logout" component={Logout} />
      <Route path="about" component={About} onEnter={requireAuth} />
      <Route path="ft" component={FilterableTable} onEnter={requireAuth} />
    <Route component={FilterableTable} >
      <Route path="*" component={(About)} onEnter={requireAuth} />
    </Route>
  </Route>


);
