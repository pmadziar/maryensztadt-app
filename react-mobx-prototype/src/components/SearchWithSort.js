import React, {Component} from 'react';
import { setCaretAtEnd } from "../helpers";

class SearchWithSort extends Component {
	constructor(props){
		super(props);
	}

	filter = '';

    static propTypes = {
        sortFunc: React.PropTypes.func.isRequired,
        filterFunc: React.PropTypes.func.isRequired
    }

    sortAscClicked = () => {
    	this.refs.aasc.style.color = "#FFBF00";
    	this.refs.adesc.style.color = '';
    	setCaretAtEnd(this.refs.inputText);
    	this.props.sortFunc("ASC");
    	return false;
    }

    sortDescClicked = () => {
    	this.refs.aasc.style.color = '';
    	this.refs.adesc.style.color = "#FFBF00";
    	setCaretAtEnd(this.refs.inputText);
    	this.props.sortFunc("DESC");
    	return false;
    }

    filterKeyPressed = (e) => {
    	console.log("Key Pressed");
    	// if ESC pressed then clear the filter
    	if(e.keyCode === 27){
    		this.refs.inputText.value = '';
    		this.filterChanged(e);
    	}
    }

    filterChanged = (e) => {
    	console.log("Changed");
    	const val = this.refs.inputText.value;
    	if(val !== this.filter){
    		this.filter = val;
    		this.props.filterFunc(this.filter);
    	}
    }

    render () {
        return (
            <span className="search-with-sort-container">
                <input type="text" name="search" placeholder={'\uD83D\uDD0E Search..'} ref="inputText" onKeyUp={this.filterKeyPressed} onChange={this.filterChanged} />
                &nbsp; <a className="fa fa-sort-alpha-asc"  onClick={this.sortAscClicked} ref="aasc"></a>
                &nbsp; <a className="fa fa-sort-alpha-desc" onClick={this.sortDescClicked} ref="adesc"></a>
            </span>
        );
    }
}

export default SearchWithSort;
