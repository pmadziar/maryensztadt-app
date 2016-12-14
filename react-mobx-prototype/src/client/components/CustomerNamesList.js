import React, {Component} from 'react';
import {observer} from 'mobx-react'; 

import CustomerNameLink from "./CustomerNameLink";
import SearchWithSort from "../components/SearchWithSort";

@observer class CustomerNamesList extends Component {

    constructor(props){
        super(props);
        this.uistate = props.UiState;
        this.CustomersStore = props.CustomersStore;
    }

    static propTypes = {
        UiState: React.PropTypes.object.isRequired,
        CustomersStore: React.PropTypes.object.isRequired
    };


    uistate;
    CustomersStore;

    componentWillMount = () => {
        this.uistate.setIsLoadin(true);
        this.CustomersStore.loadMyCustomers(() => this.uistate.setIsLoadin(false));
    };

    render () {

        
        const ShowCustomers = observer(() => {
            let ret = <span>Wczytywanie danych...</span>;
            if(!this.uistate.isLoading){
                ret  = (
                    <section className="customers-section-container">
                        {
                            this.uistate.filteredAndSortedData.map((customer) => {
                                return (
                                    <CustomerNameLink customer={customer} key={customer._id} />
                                );
                            })
                        }
                   </section>
                   );
            }
            return ret;
        });

        return (
            <div>
                <SearchWithSort sortFunc={this.uistate.sortf} filterFunc={this.uistate.filterf} />
                    <ShowCustomers />
            </div>
        );
    }
}

export default CustomerNamesList;
