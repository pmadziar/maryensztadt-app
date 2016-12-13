import SampleData from "../../lib/tests/SampleData";

class SampleDataService {
	constructor(){
		this.data = SampleData;
	}
	getActivePagesForCurrentUser = () => this.data.icons;
	
	getCustomerNamesForCurrentUser = () => Promise.resolve(this.data.customers);
}

export default SampleDataService;
