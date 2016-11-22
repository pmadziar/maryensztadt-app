import React, {Component} from 'react';

import MyDataService from "../services/MyDataService";
import CustomerNamesList from "../components/CustomerNamesList";
import SearchWithSort from "../components/SearchWithSort";

class MyCustomers extends Component {

    render () {
        const customerNames = MyDataService.getCustomerNamesForCurrentUser();
        return (
        	<div>
        		<SearchWithSort />
            	<CustomerNamesList customers={customerNames} />
            </div>
        );
    }
}

export default MyCustomers;
