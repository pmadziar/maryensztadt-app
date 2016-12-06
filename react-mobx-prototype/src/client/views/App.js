import React, {Component} from 'react';
import TopNav from '../components/TopNav';

class App extends Component {
  render () {
  	return (
  		<div className="app-container-div">
	    	<TopNav />
	        {this.props.children}
        </div>
    );
  }
}

export default App;
