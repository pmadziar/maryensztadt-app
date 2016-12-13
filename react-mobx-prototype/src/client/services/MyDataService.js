import SampleDataService from "./SampleDataService";
import { queryHelper } from "./queryHelper";

const dataService = new SampleDataService();

class MyDataService {
	constructor(service){
		this.__service = service;
	}
	getActivePagesForCurrentUser = () => this.__service.getActivePagesForCurrentUser();	
	getCustomerNamesForCurrentUser = () => queryHelper(`/api/mycustomers`);	
}

const instance = new MyDataService(dataService);
Object.freeze(instance);

export default instance;
