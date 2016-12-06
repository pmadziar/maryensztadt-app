import SampleData from "../../common/tests/SampleData";

class SampleDataService {
	constructor(){
		this.data = SampleData;
	}
	getActivePagesForCurrentUser = () => this.data.icons;
	
	getCustomerNamesForCurrentUser = () => this.data.customers;
}

export default SampleDataService;
