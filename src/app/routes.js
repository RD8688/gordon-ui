import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterableTable from './containers/FilterableTable';
import About from './components/About';
import LoginPage from './components/login/LoginPage';
import Logout from './components/Logout';

export default (
	<Switch>
		<Route exact path="/ft" component={FilterableTable} />
		<Route path="/about" component={About} />
		 <Route path="/login" component={LoginPage} />
		<Route path="/logout" component={Logout} />
		<Route path="/admin/dashboard" component={Logout} />
	</Switch>
);
