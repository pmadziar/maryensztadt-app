import React, {Component} from 'react';
import {action, observable, computed} from 'mobx';
import {observer} from 'mobx-react'; 

import CustomerNameLink from "./CustomerNameLink";
import SearchWithSort from "../components/SearchWithSort";
import CustomersStore from "../stores/CustomersStore";



@observer
class CustomerNamesList extends Component {
    componentWillMount = () => {
        CustomersStore.loadMyCustomers(this.setfilteredAndSortedData);
    };

    @observable sort;
    @observable filter;
    @observable filteredAndSortedData = [];

    @action
    sortf = (sort) => {
        if(this.sort !== sort){
            this.sort = sort;
            this.setfilteredAndSortedData();
        }
    }

    @action
    filterf = (filter) => {
        const filterLowerCase = filter.toLowerCase();
        if(this.filter !== filterLowerCase){
            this.filter = filterLowerCase;
            this.setfilteredAndSortedData();
        }
    }

    @action
    setfilteredAndSortedData = () => {
        let customers = CustomersStore.CustomerNames.slice();
        if(this.filter!==null && this.filter!==``){
            customers = customers.filter((cust) => {
                return cust.Name.toLowerCase().indexOf(this.filter) > -1;
            });
        }
        if(this.sort!==null){
            const dir = this.sort === `ASC`?1:-1;
            customers.sort((a,b)=>{
                let res = a.Name.localeCompare(b.Name);
                res *= dir;
                return res;
            });
        }
        this.filteredAndSortedData.clean();
        this.filteredAndSortedData.replace(customers);
    };

    render () {

        return (
            <div>
                <SearchWithSort sortFunc={this.sortf} filterFunc={this.filterf} />
                <section className="customers-section-container">
                    {
                        this.filteredAndSortedData.map((customer) => {
                           return (
                            <CustomerNameLink customer={customer} key={customer._id} />
                           );
                        })
                    }
                </section>
            </div>
        );
    }
}

export default CustomerNamesList;
