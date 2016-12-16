import _ from "ramda";
import {action, observable, computed} from 'mobx';

class Customer {
    @observable isLoading = false;
    @action setIsLoadin = (isloading)=>this.isLoading = isloading;
}

const uistate = new Customer();

export default uistate;

