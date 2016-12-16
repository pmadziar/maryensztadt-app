import _ from "ramda";
import {action, observable, computed} from 'mobx';
import CustomersStore from "../CustomersStore";

class CustomerNamesListStore {
    @observable sort;
    @observable filter;
    @observable isLoading = false;

    @action setIsLoadin = (isloading)=>this.isLoading = isloading;

    @action sortf = (sort) => {
        if(this.sort !== sort){
            this.sort = sort;
        }
    }

    @action filterf = (filter) => {
        const filterLowerCase = filter.toLowerCase();
        if(this.filter !== filterLowerCase){
            this.filter = filterLowerCase;
        }
    }

    @computed get filteredAndSortedData() {
        const sort = this.sort;
        const filter = this.filter;

        const diff = _.curry((dir, a, b) => {
            let res = a.Name.localeCompare(b.Name, `pl`);
            res *= dir;
            return res;
        });

        const dir = sort!==`ASC`?-1:1;

        const sortf = _.sort(diff(dir));

        const contains = _.curry((filter, cust)=>{
            if(!cust || !cust.Name) return true;
            return cust.Name.toLowerCase().indexOf(filter) > -1;
        });

        const containsFilt = contains(filter?filter:``);

        const filterf = _.filter(containsFilt);

        const sortAndFilterData = _.compose(sortf, filterf);

        return sortAndFilterData(CustomersStore.CustomerNames.slice());
    } 
}

const uistate = new CustomerNamesListStore();

export default uistate;

