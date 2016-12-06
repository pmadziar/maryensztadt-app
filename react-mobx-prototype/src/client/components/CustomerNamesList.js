import React, {Component} from 'react';
import { Link } from "react-router";

import CustomerNameLink from "./CustomerNameLink";
import SearchWithSort from "../components/SearchWithSort";

class CustomerNamesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: this.props.customers,
            sort: null,
            filter: null
        }
    }

    static propTypes = {
        customers: React.PropTypes.array.isRequired
    }

    sortf = (sort) => {
        if(this.state.sort !== sort){
            this.setState({sort});
        }
    }

    filterf = (filter) => {
        const filterLowerCase = filter.toLowerCase();
        if(this.state.filter !== filterLowerCase){
            this.setState({filter: filterLowerCase});
        }
    }

    render () {
        const state = this.state;
        let customers = state.customers;
        if(state.filter!==null && state.filter!==''){
            customers = customers.filter((cust) => {
                return cust.name.toLowerCase().indexOf(state.filter) > -1;
            });
        }
        if(state.sort!==null){
            const dir = state.sort === "ASC"?1:-1;
            customers.sort((a,b)=>{
                let res = a.name.localeCompare(b.name);
                res *= dir;
                return res;
            });
        }

        return (
            <div>
                <SearchWithSort sortFunc={this.sortf} filterFunc={this.filterf} />
                <section className="customers-section-container">
                    {
                        customers.map((customer, index) => {
                           return (
                            <CustomerNameLink customer={customer} key={customer.id} />
                           );
                        })
                    }
                </section>
            </div>
        );
    }
}

export default CustomerNamesList;
