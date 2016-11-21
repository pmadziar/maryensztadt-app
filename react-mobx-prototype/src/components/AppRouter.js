import React, {Component} from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from "./App";
import Dashboard from "./Dashboard";

class AppRouter extends Component {
  render () {
  	return (
    	<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Dashboard} />
			</Route>
		</Router>
    );
  }
}

export default AppRouter;
