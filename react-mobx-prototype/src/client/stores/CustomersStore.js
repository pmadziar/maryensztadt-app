import {observable, action} from "mobx";
import MyDataService from "../services/MyDataService";

class CurrentCustomer {
    @observable _id;
    @observable name;
    @observable NIP;
    @observable Seller;
    @observable PrimaryContact = [];
    @observable SceondaryContact = [];
}

class CustomersStore {
    Current = new CurrentCustomer();
    @observable CustomerNames = [];

    @action setCustomerNames = (data) =>{
        this.CustomerNames.replace(data);
    };

    loadMyCustomers = (cb) => {
        this.CustomerNames.clear();
        MyDataService.getCustomerNamesForCurrentUser().then((data)=>{
            if(data && data.length){
                this.setCustomerNames(data);
            }
            if(typeof(cb) === `function`){
                cb();
            }
        }).catch();
    }
}

const store = new CustomersStore();
export default store;
