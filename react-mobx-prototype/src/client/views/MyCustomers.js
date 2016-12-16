import React, {Component} from 'react';
import CustomerNamesList from "../components/CustomerNamesList";
import CustomersStore from "../stores/CustomersStore";
import uistate from "../stores/UI/CustomerNamesListStore";

class MyCustomers extends Component {

    render () {
        return (
        	<div>
            	<CustomerNamesList CustomersStore={CustomersStore} UiState={uistate} />
            </div>
        );
    }
}

export default MyCustomers;
