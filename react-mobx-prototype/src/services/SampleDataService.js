import SampleData from "../SampleData";

class SampleDataService {
	constructor(){
		this.data = SampleData;
	}
	getActivePagesForCurrentUser = () => {
		return this.data.icons;
	}
}

export default SampleDataService;