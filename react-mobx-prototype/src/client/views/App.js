import React, {Component} from 'react';
import TopNav from '../components/TopNav';
import Devtools from "mobx-react-devtools";

class App extends Component {
  render () {
  	return (
  		<div className="app-container-div">
        <Devtools />
	    	<TopNav />
	        {this.props.children}
        </div>
    );
  }
}

export default App;
