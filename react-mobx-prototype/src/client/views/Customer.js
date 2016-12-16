import React, {Component} from 'react';
import CustomerDetails from '../components/CustomerDetails';

import CustomersStore from "../stores/CustomersStore";
import UiState from "../stores/UI/Customer";

class Customer extends Component {
    render () {
        return (
            <CustomerDetails {...this.props} CustomersStore={CustomersStore} UiState={UiState} />
        );
    }
}

export default Customer;
