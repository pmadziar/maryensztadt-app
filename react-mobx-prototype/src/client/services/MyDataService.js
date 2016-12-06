import SampleDataService from "./SampleDataService";

const dataService = new SampleDataService();

class MyDataService {
	constructor(service){
		this.__service = service;
	}
	getActivePagesForCurrentUser = () => this.__service.getActivePagesForCurrentUser();	
	getCustomerNamesForCurrentUser = () => this.__service.getCustomerNamesForCurrentUser();	
}

const instance = new MyDataService(dataService);
Object.freeze(instance);

export default instance;
