import React, {Component} from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from "./App";
import Dashboard from "./Dashboard";
import MyCustomers from "./MyCustomers";
import Customer from "./Customer";

class AppRouter extends Component {
  render () {
  	return (
    	<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Dashboard} />
				<Route path="/mycustomers" component={MyCustomers} />
				<Route path="/customers/:id" component={Customer} />
			</Route>
		</Router>
    );
  }
}

export default AppRouter;
