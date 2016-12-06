import SampleData from "../../lib/tests/SampleData";

class SampleDataService {
	constructor(){
		this.data = SampleData;
	}
	getActivePagesForCurrentUser = () => this.data.icons;
	
	getCustomerNamesForCurrentUser = () => this.data.customers;
}

export default SampleDataService;
