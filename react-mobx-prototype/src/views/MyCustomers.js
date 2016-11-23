import React, {Component} from 'react';

import MyDataService from "../services/MyDataService";
import CustomerNamesList from "../components/CustomerNamesList";

class MyCustomers extends Component {

    render () {
        const customerNames = MyDataService.getCustomerNamesForCurrentUser();
        return (
        	<div>
            	<CustomerNamesList customers={customerNames} />
            </div>
        );
    }
}

export default MyCustomers;
