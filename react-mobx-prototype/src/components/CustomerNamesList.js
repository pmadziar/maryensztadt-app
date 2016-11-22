import React, {Component} from 'react';
import { Link } from "react-router";

import CustomerNameLink from "./CustomerNameLink";

class CustomerNamesList extends Component {
    static propTypes = {
        customers: React.PropTypes.array.isRequired
    }

    render () {
        const customers = this.props.customers;
        return (
            <section className="customers-section-container">
                {
                    customers.map((customer, index) => {
                       return (
                        <CustomerNameLink customer={customer} key={customer.id} />
                       );
                    })
                }
            </section>
        );
    }
}

export default CustomerNamesList;
