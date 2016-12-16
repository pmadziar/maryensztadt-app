import React, {Component} from 'react';

export class CustomerDetails extends Component {
    static propTypes = {
        CurrentCustomer: React.PropTypes.object.isRequired,
        UiState: React.PropTypes.object.isRequired
    }

    showContact = (contact) => {
        return (
            <div>
                <div>
                    <span>Id:</span>
                    <span>{contact._id}</span>
                </div>
                <div>
                    <span>Address1:</span>
                    <span>{contact.Address1}</span>
                </div>
                <div>
                    <span>Address2:</span>
                    <span>{contact.Address2}</span>
                </div>
                <div>
                    <span>City:</span>
                    <span>{contact.City}</span>
                </div>
                <div>
                    <span>Email:</span>
                    <span>{contact.Email}</span>
                </div>
                <div>
                    <span>PhoneNo:</span>
                    <span>{contact.PhoneNo}</span>
                </div>
                <div>
                    <span>State:</span>
                    <span>{contact.State}</span>
                </div>
                <div>
                    <span>Primary:</span>
                    <span>{contact.Primary.toString()}</span>
                </div>
            </div>
        );
    };

    render = () => {
        return (
            <div className="panel">
                <div className="panel_title">
                    Nazwa i adress
                </div>
                <div className="panel_body">
                    <div>
                        <span>Name:</span>
                        <span>{this.props.CurrentCustomer.Name}</span>
                    </div>
                    <div>
                        <span>NIP:</span>
                        <span>{this.props.CurrentCustomer.NIP}</span>
                    </div>
                    <div>
                        <span>Seller:</span>
                        <span>{this.props.CurrentCustomer.Seller}</span>
                    </div>
                    {this.showContact(this.props.CurrentCustomer.PrimaryContact)}
                </div>
                <div className="panel_footer">
                    
                </div>
            </div>
        );
    }
}
