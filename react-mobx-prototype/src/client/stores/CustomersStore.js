import {observable, action} from "mobx";
import MyDataService from "../services/MyDataService";
import _ from 'ramda';

class CurrentCustomer {
    _id;
    Name;
    NIP;
    Seller;
    PrimaryContact = [];
    SceondaryContact = [];
}

class CustomersStore {
    CurrentCustomer = new CurrentCustomer();
    @observable CustomerNames = [];

    @action setCustomerNames = (data) =>{
        this.CustomerNames.replace(data);
    };

    setCurrentCustomer = (data) => {
        this.CurrentCustomer._id = data._id;
        this.CurrentCustomer.Name = data.Name;
        this.CurrentCustomer.NIP = data.NIP;
        this.CurrentCustomer.Seller = data.Seller;

        const getPrimaryContact = _.compose(_.head, _.filter(_.prop(`Primary`)));
        this.CurrentCustomer.PrimaryContact = getPrimaryContact(data.Contact);

        const getSecondaryContect = _.filter(_.compose(_.not, _.prop(`Primary`)));
        this.CurrentCustomer.SceondaryContact  = getSecondaryContect(data.Contact);
    }

    loadMyCustomers = (cb) => {
        MyDataService.getCustomerNamesForCurrentUser().then((data)=>{
            if(data && data.length){
                this.setCustomerNames(data);
            }
            if(typeof(cb) === `function`){
                cb();
            }
        }).catch();
    }

    loadCustomer = (cb, id) => {
        MyDataService.getCustomerById(id).then((data)=>{
            this.setCurrentCustomer(data);
            if(typeof(cb) === `function`){
                cb();
            }
        });
    };
}

const store = new CustomersStore();
export default store;
