import React, {Component} from 'react';
import { Link } from "react-router";


class CustomerNameLink extends Component {
    static propTypes = {
        customer: React.PropTypes.object.isRequired
    }

    render () {
        const customer = this.props.customer;
        const linkto = `/customers/${customer._id}`;
        return (
			<Link to={linkto} className="customer-section-container">
				{customer.Name}
			</Link>
        );
    }
}

export default CustomerNameLink;
